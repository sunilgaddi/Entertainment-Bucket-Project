pipeline {
    agent any
    
    tools {nodejs '17.0.0'}
    
    stages {
        stage('Checking Version') {
            steps {
                bat "npm version"
                bat "npm install"
                dir('client') {
                    bat "dir"
                    bat 'npm install'
                    bat 'npm run build'
                }
                bat "npm run dev"
            }
        }
    }
}
