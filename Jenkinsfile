pipeline {
    agent {label "linux"}
    
    tools {nodejs 'node'}
    
    stages {
        stage('Checking Version') {
            steps {
                sh "npm version"
                sh "npm install"
                dir('client') {
                    sh "dir"
                    sh 'npm install'
                    sh 'npm run build'
                    sh 'npm i -g serve'
                    sh 'serve -s build'
                }
            }
        }
    }
}
