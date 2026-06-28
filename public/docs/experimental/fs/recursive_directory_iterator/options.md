# std::experimental::filesystem::recursive_directory_iterator::options

directory_options options() const; |  |  (filesystem TS)  

  
Retorna as opções que afetam a iteração de diretório. As opções só podem ser fornecidas ao construir o iterator de diretório. 

Se o argumento options não foi fornecido, retorna options::none. 

### Parâmetros

(nenhum) 

### Valor de retorno

As opções efetivas que afetam a iteração de diretório. 

### Exceções

Não lança exceções. 