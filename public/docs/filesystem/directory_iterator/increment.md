# std::filesystem::directory_iterator::operator++, std::filesystem::directory_iterator::increment

```cpp
directory_iterator& operator++();  // (1) (desde C++17)
directory_iterator& increment( std::error_code& ec );  // (2) (desde C++17)
```

Avança o iterator para a próxima entrada. Invalida todas as cópias do valor anterior de *this.

| Esta seção está incompleta

### Parâmetros

- **ec** — código de erro para armazenar o status do erro

### Valor de retorno

*this

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

1) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros da API do sistema operacional subjacente, construído com o código de erro do sistema operacional como argumento do código de erro.

2) Define um parâmetro [std::error_code](<#/doc/error/error_code>)& para o código de erro da API do sistema operacional se uma chamada de API do sistema operacional falhar, e executa `ec.clear()` se nenhum erro ocorrer.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3013](<https://cplusplus.github.io/LWG/issue3013>) | C++17 | Sobrecarga de `error_code` marcada como `noexcept`, mas pode alocar memória | `noexcept` removido