# std::experimental::filesystem::is_fifo

Definido no cabeçalho `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```c
bool is_fifo( file_status s );
bool is_fifo( const path& p );
bool is_fifo( const path& p, error_code& ec );
```

  
Verifica se o status de arquivo ou caminho fornecido corresponde a um arquivo FIFO ou pipe. 

1) Equivalente a s.type() == file_type::fifo.

2) Equivalente a is_fifo(status(p)).

3) Equivalente a is_fifo(status(p, ec)). Retorna false e define ec para um código de erro apropriado se ocorrer um erro. Caso contrário, ec é limpo com uma chamada para ec.clear().

### Parâmetros

s  |  \-  |  status do arquivo a ser verificado   
---|---|---
p  |  \-  |  caminho a ser consultado   
ec  |  \-  |  código de erro a ser modificado em caso de erros   
  
### Valor de retorno

true se o caminho ou status de arquivo fornecido corresponder a um arquivo FIFO. 

### Exceções

1,3)

[`noexcept`](<#/doc/language/noexcept_spec>) especificação: 

noexcept

2) Lança filesystem_error se ocorrer um erro. O objeto de exceção é construído com p como argumento.

### Veja também

| Esta seção está incompleta   