# std::filesystem::directory_entry::hard_link_count

```cpp
std::uintmax_t hard_link_count() const;  // (1) (desde C++17)
std::uintmax_t hard_link_count( std::error_code& ec ) const noexcept;  // (2) (desde C++17)
```

Se o número de hard links estiver em cache neste [`directory_entry`](<#/doc/filesystem/directory_entry/directory_entry>), retorna o valor em cache. Caso contrário, retorna:

1) [std::filesystem::hard_link_count](<#/doc/filesystem/hard_link_count>)(path()),

2) [std::filesystem::hard_link_count](<#/doc/filesystem/hard_link_count>)(path(), ec).

### Parâmetros

- **ec** — parâmetro de saída para relatório de erros na sobrecarga que não lança exceções

### Valor de retorno

O número de hard links para o objeto do sistema de arquivos referenciado.

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

1) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros subjacentes da API do SO, construída com p como o primeiro argumento de caminho e o código de erro do SO como o argumento de código de erro.

2) Define um parâmetro [std::error_code](<#/doc/error/error_code>)& para o código de erro da API do SO se uma chamada da API do SO falhar, e executa ec.[`clear`](<#/doc/error/error_code/clear>)() se nenhum erro ocorrer.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ hard_link_count](<#/doc/filesystem/hard_link_count>)(C++17) | retorna o número de hard links que referenciam o arquivo específico
(função)