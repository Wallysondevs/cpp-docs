# std::experimental::filesystem::is_directory

Definido no header `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```cpp
bool is_directory( file_status s );  // (1)
bool is_directory( const path& p );  // (2)
bool is_directory( const path& p, error_code& ec );  // (3)
```

  
Verifica se o status de arquivo ou caminho fornecido corresponde a um diretório.

1) Equivalente a s.type() == file_type::directory.

2) Equivalente a is_directory(status(p)).

3) Equivalente a is_directory(status(p, ec)). Retorna false se ocorrer um erro.

### Parâmetros

s  |  \-  |  status de arquivo para verificar   
---|---|---
p  |  \-  |  caminho para consultar   
ec  |  \-  |  código de erro para modificar em caso de erros   
  
### Valor de retorno

true se o caminho ou status de arquivo fornecido corresponde a um diretório, false caso contrário.

### Exceções

1,3)

Especificação `noexcept`: 

noexcept

2) Lança filesystem_error se ocorrer um erro. O objeto de exceção é construído com p como argumento.

### Veja também

| Esta seção está incompleta   