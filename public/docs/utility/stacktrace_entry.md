# std::stacktrace_entry

Definido no cabeçalho `[<stacktrace>](<#/doc/header/stacktrace>)`

```c
class stacktrace_entry;
```

A classe `stacktrace_entry` fornece operações para consultar informações sobre uma avaliação em um stacktrace. Cada objeto `stacktrace_entry` é vazio ou representa uma avaliação em um stacktrace.

`stacktrace_entry` modela [std::regular](<#/doc/concepts/regular>) e [std::three_way_comparable](<#/doc/utility/compare/three_way_comparable>)<[std::strong_ordering](<#/doc/utility/compare/strong_ordering>)>.

### Tipos Membro

`native_handle_type` | tipo de handle nativo definido pela implementação

### Funções Membro

[ (construtor)](<#/doc/utility/stacktrace_entry/stacktrace_entry>) | constrói um novo `stacktrace_entry`
(função membro pública)
(destrutor) | destrói o `stacktrace_entry`
(função membro pública)
[ operator=](<#/>) | atribui o conteúdo de um `stacktrace_entry` a outro
(função membro pública)

##### Observadores

[ native_handle](<#/doc/utility/stacktrace_entry/native_handle>) | obtém o handle nativo definido pela implementação do `stacktrace_entry`
(função membro pública)
[ operator bool](<#/doc/utility/stacktrace_entry/operator_bool>) | verifica se o `stacktrace_entry` está vazio
(função membro pública)

##### Consulta

[ description](<#/doc/utility/stacktrace_entry/description>) | obtém a descrição da avaliação representada pelo `stacktrace_entry`
(função membro pública)
[ source_file](<#/doc/utility/stacktrace_entry/source_file>) | obtém o nome do arquivo fonte que contém lexicalmente a expressão ou instrução cuja avaliação é representada pelo `stacktrace_entry`
(função membro pública)
[ source_line](<#/doc/utility/stacktrace_entry/source_line>) | obtém o número da linha que se relaciona lexicalmente com a avaliação representada pelo `stacktrace_entry`
(função membro pública)

### Funções Não-Membro

[ operator==operator<=>](<#/doc/utility/stacktrace_entry/operator_cmp>)(C++23) | compara dois valores `stacktrace_entry`
(função)
[ to_string](<#/doc/utility/stacktrace_entry/to_string>)(C++23) | retorna uma string com uma descrição do `stacktrace_entry`
(função)
[ operator<<](<#/doc/utility/stacktrace_entry/operator_ltlt>)(C++23) | realiza a saída de stream de `stacktrace_entry`
(modelo de função)

### Classes Auxiliares

[ std::hash<std::stacktrace_entry>](<#/doc/utility/stacktrace_entry/hash>)(C++23) | suporte a hash para `std::stacktrace_entry`
(especialização de modelo de classe)
[ std::formatter<std::stacktrace_entry>](<#/doc/utility/stacktrace_entry/formatter>)(C++23) | suporte a formatação para `stacktrace_entry`
(especialização de modelo de classe)

### Notas

`boost::stacktrace::frame` (disponível em [Boost.Stacktrace](<https://www.boost.org/doc/libs/release/doc/html/stacktrace.html>)) pode ser usado em vez disso quando `std::stacktrace_entry` não estiver disponível.

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_stacktrace`](<#/doc/feature_test>) | [`202011L`](<#/>) | (C++23) | [Biblioteca Stacktrace](<#/doc/error>)

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ basic_stacktrace](<#/doc/utility/basic_stacktrace>)(C++23) | representação aproximada de uma sequência de invocação que consiste em entradas de stacktrace
(modelo de classe)
[ source_location](<#/doc/utility/source_location>)(C++20) | uma classe que representa informações sobre o código fonte, como nomes de arquivos, números de linha e nomes de funções
(classe)