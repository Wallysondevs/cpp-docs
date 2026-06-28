# std::runtime_error

Definido no cabeçalho `[<stdexcept>](<#/doc/header/stdexcept>)`

```c
class runtime_error;
```

Define um tipo de objeto a ser lançado como exceção. Ele reporta erros que são devidos a eventos além do escopo do programa e não podem ser facilmente previstos.

Diagrama de herança

Exceções do tipo `std::runtime_error` são lançadas pelos seguintes componentes da standard library:

  * [std::locale::locale](<#/doc/locale/locale/locale>)
  * [std::locale::combine](<#/doc/locale/locale/combine>)

  * [std::chrono::current_zone](<#/doc/chrono/current_zone>)
  * [std::chrono::get_tzdb_list](<#/doc/chrono/tzdb_functions>)
  * [std::chrono::get_tzdb](<#/doc/chrono/tzdb_functions>)
  * [std::chrono::locate_zone](<#/doc/chrono/locate_zone>)
  * [std::chrono::reload_tzdb](<#/doc/chrono/tzdb_functions>)
  * [std::chrono::remote_version](<#/doc/chrono/tzdb_functions>)
  * [std::chrono::tzdb::locate_zone](<#/doc/chrono/tzdb/locate_zone>)

| (desde C++20)

Além disso, os seguintes tipos de exceção padrão são derivados de `std::runtime_error`:

  * [std::range_error](<#/doc/error/range_error>)
  * [std::overflow_error](<#/doc/error/overflow_error>)
  * [std::underflow_error](<#/doc/error/underflow_error>)

  * [std::ios_base::failure](<#/doc/io/ios_base/failure>)
  * [std::regex_error](<#/doc/regex/regex_error>)
  * [std::system_error](<#/doc/error/system_error>)

| (desde C++11)

  * [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>)

| (desde C++17)

  * [std::chrono::ambiguous_local_time](<#/doc/chrono/ambiguous_local_time>)
  * [std::chrono::nonexistent_local_time](<#/doc/chrono/nonexistent_local_time>)
  * [std::format_error](<#/doc/utility/format/format_error>)

| (desde C++20)

### Funções membro

(construtor) | constrói um novo objeto `runtime_error` com a mensagem fornecida
(função membro pública)
operator= | substitui o objeto `runtime_error`
(função membro pública)

## std::runtime_error::runtime_error

```cpp
runtime_error( const std::string& what_arg );  // (1)
runtime_error( const char* what_arg );  // (2)
runtime_error( const runtime_error& other ); | (3) | (noexcept desde C++11)
```

1) Constrói o objeto de exceção com `what_arg` como string explicativa. Após a construção, [std::strcmp](<#/doc/string/byte/strcmp>)(what(), what_arg.c_str()) == 0.

2) Constrói o objeto de exceção com `what_arg` como string explicativa. Após a construção, [std::strcmp](<#/doc/string/byte/strcmp>)(what(), what_arg) == 0.

3) Construtor de cópia. Se *this e `other` ambos tiverem o tipo dinâmico `std::runtime_error`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0. Nenhuma exceção pode ser lançada a partir do construtor de cópia.

### Parâmetros

- **what_arg** — string explicativa
- **other** — outro objeto de exceção para copiar

### Exceções

1,2) Pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>).

### Notas

Como a cópia de `std::runtime_error` não é permitida a lançar exceções, esta mensagem é tipicamente armazenada internamente como uma string com contagem de referências alocada separadamente. É também por isso que não existe um construtor que aceite `std::string&&`: ele teria que copiar o conteúdo de qualquer forma.

Antes da resolução do [LWG issue 254](<https://cplusplus.github.io/LWG/issue254>), o construtor não-de-cópia só podia aceitar [std::string](<#/doc/string/basic_string>). Isso tornava a alocação dinâmica obrigatória para construir um objeto [std::string](<#/doc/string/basic_string>).

Após a resolução do [LWG issue 471](<https://cplusplus.github.io/LWG/issue471>), uma classe de exceção padrão derivada deve ter um construtor de cópia publicamente acessível. Ele pode ser implicitamente definido desde que as strings explicativas obtidas por `what()` sejam as mesmas para o objeto original e o objeto copiado.

## std::runtime_error::operator=

runtime_error& operator=( const runtime_error& other ); | | (noexcept desde C++11)

Atribui o conteúdo com o de `other`. Se *this e `other` ambos tiverem o tipo dinâmico `std::runtime_error`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0 após a atribuição. Nenhuma exceção pode ser lançada a partir do operador de atribuição de cópia.

### Parâmetros

- **other** — outro objeto de exceção para atribuir

### Valor de retorno

*this

### Notas

Após a resolução do [LWG issue 471](<https://cplusplus.github.io/LWG/issue471>), uma classe de exceção padrão derivada deve ter um operador de atribuição de cópia publicamente acessível. Ele pode ser implicitamente definido desde que as strings explicativas obtidas por `what()` sejam as mesmas para o objeto original e o objeto copiado.

## Herdado de [std::exception](<#/doc/error/exception>)

### Funções membro

[ (destrutor)](<#/doc/error/exception/~exception>)[virtual] | destrói o objeto de exceção
(função membro pública virtual de `std::exception`)
[ what](<#/doc/error/exception/what>)[virtual] | retorna uma string explicativa
(função membro pública virtual de `std::exception`)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 254](<https://cplusplus.github.io/LWG/issue254>) | C++98 | o construtor que aceita const char* estava faltando | adicionado
[LWG 471](<https://cplusplus.github.io/LWG/issue471>) | C++98 | as strings explicativas das cópias de `std::runtime_error` eram definidas pela implementação | elas são as mesmas do objeto `std::runtime_error` original