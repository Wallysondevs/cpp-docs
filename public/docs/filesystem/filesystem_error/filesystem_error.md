# std::filesystem::filesystem_error::filesystem_error

```cpp
filesystem_error( const std::string& what_arg,
std::error_code ec );  // (1) (desde C++17)
filesystem_error( const std::string& what_arg,
const std::filesystem::path& p1,
std::error_code ec );  // (2) (desde C++17)
filesystem_error( const std::string& what_arg,
const std::filesystem::path& p1,
const std::filesystem::path& p2,
std::error_code ec );  // (3) (desde C++17)
filesystem_error( const filesystem_error& other ) noexcept;  // (4) (desde C++17)
```

  
Constrói um novo objeto `filesystem_error`.

1-3) O código de erro é definido como `ec` e, opcionalmente, os caminhos envolvidos na operação que resultou no erro são definidos como `p1` e `p2`. [`what()`](<#/doc/filesystem/filesystem_error/what>) após a construção retorna uma string que contém `what_arg` (assumindo que ela não contém um caractere nulo embutido). Se um ou ambos os argumentos `path` não forem fornecidos, um `path` nulo é usado em seu lugar.

4) Construtor de cópia. Inicializa o conteúdo com o de `other`. Se *this e `other` ambos tiverem o tipo dinâmico `std::filesystem_error::filesystem_error`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0.

### Parâmetros

what_arg  |  \-  |  string explicativa   
---|---|---
ec  |  \-  |  código de erro para o erro específico dependente do sistema operacional   
p1, p2  |  \-  |  caminhos envolvidos na operação que levanta o erro de sistema   
other  |  \-  |  outro objeto `filesystem_error` para copiar   
  
### Observações

Como a cópia de `std::filesystem::filesystem_error` não é permitida a lançar exceções, a string explicativa é tipicamente armazenada internamente em um armazenamento com contagem de referências alocado separadamente. É por isso também que não há um construtor que aceite `std::string&&`: ele teria que copiar o conteúdo de qualquer forma.

Implementações típicas também armazenam objetos `path` referenciados por [path1()](<#/doc/filesystem/filesystem_error/path>) e [path2()](<#/doc/filesystem/filesystem_error/path>) no armazenamento com contagem de referências.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   