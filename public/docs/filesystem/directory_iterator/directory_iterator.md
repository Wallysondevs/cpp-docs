# std::filesystem::directory_iterator::directory_iterator

```cpp
directory_iterator() noexcept;  // (1) (desde C++17)
explicit directory_iterator( const std::filesystem::path& p );  // (2) (desde C++17)
directory_iterator( const std::filesystem::path& p,
std::filesystem::directory_options options );  // (3) (desde C++17)
directory_iterator( const std::filesystem::path& p, std::error_code& ec );  // (4) (desde C++17)
directory_iterator( const std::filesystem::path& p,
std::filesystem::directory_options options,
std::error_code& ec );  // (5) (desde C++17)
directory_iterator( const directory_iterator& other ) = default;  // (6) (desde C++17)
directory_iterator( directory_iterator&& other ) = default;  // (7) (desde C++17)
```

Constrói um novo iterator de diretório.

1) Constrói o iterator de fim.

2) Constrói um iterator de diretório que se refere à primeira entrada de diretório de um diretório identificado por `p`. Se `p` se refere a um arquivo não existente ou não é um diretório, lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>).

3) O mesmo que (2), mas se [std::filesystem::directory_options::skip_permission_denied](<#/doc/filesystem/directory_options>) estiver definido em `options` e a construção encontrar um erro de permissão negada, constrói o iterator de fim e não reporta um erro.

4) Constrói um iterator de diretório que se refere à primeira entrada de diretório de um diretório identificado por `p`. Se `p` se refere a um arquivo não existente ou não é um diretório, retorna o iterator de fim e define `ec`.

5) O mesmo que (4), mas se [std::filesystem::directory_options::skip_permission_denied](<#/doc/filesystem/directory_options>) estiver definido em `options` e a construção encontrar um erro de permissão negada, constrói o iterator de fim e não reporta um erro.

6) Construtor de cópia.

7) Construtor de movimento.

### Parâmetros

- **p** — caminho para o objeto do filesystem ao qual o iterator de diretório se referirá
- **ec** — parâmetro de saída para relatório de erros nas sobrecargas que não lançam exceções
- **options** — o conjunto de opções [BitmaskType](<#/doc/named_req/BitmaskType>) que controlam o comportamento do iterator de diretório
- **other** — outro iterator de diretório para usar como fonte para inicializar o iterator de diretório

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

2,3) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros da API subjacente do SO, construído com `p` como o primeiro argumento de caminho e o código de erro do SO como o argumento de código de erro.

4,5) Define um parâmetro [std::error_code](<#/doc/error/error_code>)& para o código de erro da API do SO se uma chamada de API do SO falhar, e executa ec.[`clear`](<#/doc/error/error_code/clear>)() se nenhum erro ocorrer.

### Notas

Para iterar sobre o diretório atual, construa o iterator como `directory_iterator(".")` em vez de `directory_iterator("")`.

### Exemplo

| Esta seção está incompleta
Motivo: nenhum exemplo

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3013](<https://cplusplus.github.io/LWG/issue3013>) | C++17 | Sobrecarga de `error_code` marcada como noexcept, mas pode alocar memória | noexcept removido