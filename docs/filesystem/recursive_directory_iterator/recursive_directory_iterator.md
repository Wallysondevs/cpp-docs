# std::filesystem::recursive_directory_iterator::recursive_directory_iterator

```cpp
recursive_directory_iterator() noexcept;  // (1) (desde C++17)
recursive_directory_iterator( const recursive_directory_iterator& other );  // (2) (desde C++17)
recursive_directory_iterator( recursive_directory_iterator&& other ) noexcept;  // (3) (desde C++17)
explicit recursive_directory_iterator( const std::filesystem::path& p );  // (4) (desde C++17)
recursive_directory_iterator(
const std::filesystem::path& p,
std::filesystem::directory_options options );  // (5) (desde C++17)
recursive_directory_iterator(
const std::filesystem::path& p,
std::filesystem::directory_options options,
std::error_code& ec );  // (6) (desde C++17)
recursive_directory_iterator( const std::filesystem::path& p, std::error_code& ec );  // (7) (desde C++17)
```

Constrói um novo iterador de diretório recursivo.

1) Construtor padrão. Constrói um iterador de fim.

2) Construtor de cópia.

3) Construtor de movimento.

4-7) Constrói um iterador que se refere à primeira entrada no diretório para o qual p se resolve.

| Esta seção está incompleta
Motivo: erros

### Parâmetros

- **p** — caminho para o objeto do filesystem ao qual o iterador de diretório se referirá
- **ec** — parâmetro de saída para relatório de erros nas sobrecargas que não lançam exceções
- **options** — o conjunto de opções [BitmaskType](<#/doc/named_req/BitmaskType>) que controlam o comportamento do iterador de diretório
- **other** — outro iterador de diretório para usar como fonte para inicializar o iterador de diretório

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

4,5) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros subjacentes da API do sistema operacional, construído com p como o primeiro argumento de caminho e o código de erro do sistema operacional como o argumento de código de erro.

6,7) Define um parâmetro [std::error_code](<#/doc/error/error_code>)& para o código de erro da API do sistema operacional se uma chamada da API do sistema operacional falhar, e executa ec::`clear`() se nenhum erro ocorrer.

### Observações

Iteradores de diretório recursivos não seguem symlinks de diretório por padrão. Para habilitar este comportamento, especifique [directory_options::follow_directory_symlink](<#/doc/filesystem/directory_options>) entre o conjunto de opções `options`.

### Exemplo

| Esta seção está incompleta
Motivo: nenhum exemplo

### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3013](<https://cplusplus.github.io/LWG/issue3013>) | C++17 | Sobrecarga de `error_code` marcada como noexcept mas pode alocar memória | noexcept removido