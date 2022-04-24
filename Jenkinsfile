pipeline {
    agent any
    
    tools {nodejs '17.0.0'}
    
    stages {
        stage('Checking Version') {
            steps {
                bat "npm version"
                bat "npm install"
                bat 'cd client'
                bat 'npm install'
                bat 'npm run build'
                bat 'cd ./'
                bat "npm run dev"
            }
        }
    }
}
