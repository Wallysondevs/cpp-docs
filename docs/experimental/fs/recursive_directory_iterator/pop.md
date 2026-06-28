# std::experimental::filesystem::recursive_directory_iterator::pop

void pop(); |  |  (filesystem TS)  

  
Move o iterator um nível acima na hierarquia de diretórios.

Se o diretório pai estiver fora da hierarquia de diretórios que está sendo iterada (ou seja, `depth() == 0`), define `*this` como um iterator de diretório final.

### Parâmetros

(nenhum)

### Valor de retorno

(nenhum)

### Exceções

| Esta seção está incompleta   