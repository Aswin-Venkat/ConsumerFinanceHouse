pipeline {
    agent any
      stages {
        stage('Checkout') {
            steps {
                step([$class: 'WsCleanup'])
                checkout scm
            }
        }
        stage('Environment') {
            steps {
                sh 'git --version'
                echo "Branch: ${env.BRANCH_NAME}"
                sh 'docker -v'
                sh 'printenv'
            }
        }
        stage('Unit Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Sonar Test') {
             environment {
                scannerHome = tool 'SonarQubeScanner'
            }
            steps {
                withSonarQubeEnv('sonarqube') {
                    sh "${scannerHome}/bin/sonar-scanner"
                }
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
             }
        }
        stage('Build') {
            steps {
               sh "docker images"
               sh "docker build -t consumer-finance-house-cwa:v${BUILD_NUMBER} ."
               sh "docker images"
            }
        }
        stage('Deploy') {
            steps {
                sh "docker ps -a"
                sh 'docker stop cwa-container || exit 0'
                sh 'docker kill cwa-container || exit 0'
                sh 'docker rm cwa-container || exit 0'
                sh "docker run --name cwa-container -d -p 80:80 consumer-finance-house-cwa:v${BUILD_NUMBER}"
                sh "docker ps -a"
            }
        }
        stage('upload') {
            steps {
                sh "docker images"
                sh 'docker login -u admin -p admin123 51.132.233.171:8083'
                sh "docker tag consumer-finance-house-cwa:v${BUILD_NUMBER} 51.132.233.171:8083/consumer-finance-house-cwa:v${BUILD_NUMBER}"
                sh "docker push 51.132.233.171:8083/consumer-finance-house-cwa:v${BUILD_NUMBER}"
                echo "nexus upload successful"
            }
        }
    }
}
