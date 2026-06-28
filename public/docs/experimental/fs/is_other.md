# std::experimental::filesystem::is_other

Definido no cabeçalho `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```c
bool is_other( file_status s );
bool is_other( const path& p );
bool is_other( const path& p, error_code& ec );
```

  
Verifica se o status de arquivo ou caminho fornecido corresponde a um arquivo do tipo _outro_. Ou seja, o arquivo existe, mas não é um arquivo regular, nem um diretório, nem um symlink.

1) Equivalente a exists(s) && !is_regular_file(s) && !is_directory(s) && !is_symlink(s).

2) Equivalente a is_other(status(p)).

3) Equivalente a is_other(status(p, ec)). Retorna false e define ec para um código de erro apropriado se ocorrer um erro. Caso contrário, ec é limpo com uma chamada para ec.clear().

### Parâmetros

s  |  \-  |  status de arquivo a ser verificado   
---|---|---
p  |  \-  |  caminho a ser examinado   
ec  |  \-  |  código de erro para armazenar o status do erro   
  
### Valor de retorno

true se o caminho ou status de arquivo fornecido corresponder a um arquivo _outro_, false caso contrário.

### Exceções

1,3)

Especificação [`noexcept`](<#/doc/language/noexcept_spec>): 

noexcept

2) Lança filesystem_error se ocorrer um erro. O erro é construído com p como argumento. O código de erro é definido para um código de erro apropriado para o erro que causou a falha.

### Veja também

| Esta seção está incompleta   