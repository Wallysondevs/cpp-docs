# std::filesystem::directory_entry::directory_entry

```cpp
directory_entry() noexcept = default;  // (1) (desde C++17)
directory_entry( const directory_entry& ) = default;  // (2) (desde C++17)
directory_entry( directory_entry&& ) noexcept = default;  // (3) (desde C++17)
explicit directory_entry( const std::filesystem::path& p );  // (4) (desde C++17)
directory_entry( const std::filesystem::path& p, std::error_code& ec );  // (5) (desde C++17)
```

Constrói um novo objeto `directory_entry`.

1) Construtor padrão.

2) Construtor de cópia com implementação padrão.

3) Construtor de movimento com implementação padrão.

4,5) Inicializa a entrada de diretório com o path p e chama [`refresh`](<#/doc/filesystem/directory_entry/refresh>) para atualizar os atributos em cache. Se ocorrer um erro, a sobrecarga que não lança exceções deixa o `directory_entry` contendo um path construído por padrão.

### Parâmetros

- **p** — path para o objeto do sistema de arquivos ao qual a entrada de diretório se referirá
- **ec** — parâmetro de saída para relatório de erros na sobrecarga que não lança exceções

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

1-4) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros subjacentes da API do sistema operacional, construída com p como o primeiro argumento de path e o código de erro do sistema operacional como o argumento do código de erro.

5) Define um parâmetro [std::error_code](<#/doc/error/error_code>)& para o código de erro da API do sistema operacional se uma chamada à API do sistema operacional falhar, e executa ec.[`clear`](<#/doc/error/error_code/clear>)() se nenhum erro ocorrer.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo