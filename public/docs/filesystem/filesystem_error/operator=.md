# std::filesystem::filesystem_error::operator=

```cpp
filesystem_error& operator=( const filesystem_error& other ) noexcept;  // (desde C++17)
```

Atribui o conteúdo com o de `other`. Se `*this` e `other` ambos tiverem o tipo dinâmico `std::filesystem::filesystem_error`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0 após a atribuição.

### Parâmetros

- **other** — outro objeto `filesystem_error` para atribuir

### Valor de retorno

`*this`

### Observações

Implementações típicas armazenam objetos `path` referenciados por path1() e path2() em um armazenamento com contagem de referências. Como resultado, `*this` e `other` geralmente compartilham seus objetos `path` após a atribuição.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo