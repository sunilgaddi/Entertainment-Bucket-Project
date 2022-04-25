pipeline {
    agent {label "linux"}
    
    tools {nodejs 'node'}
    
    stages {
        stage('Checking Version') {
            steps {
                bat "npm version"
                bat "npm install"
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
