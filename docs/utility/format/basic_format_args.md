# std::basic_format_args

Definido no cabeçalho `[<format>](<#/doc/header/format>)`

```c
template< class Context >
class basic_format_args;
using format_args = basic_format_args<std::format_context>;
using wformat_args = basic_format_args<std::wformat_context>;
```

Fornece acesso aos argumentos de formatação.

### Funções membro

(construtor) | constrói um objeto `basic_format_args`
(função membro pública)
get | retorna o argumento de formatação no índice fornecido
(função membro pública)

## std::basic_format_args::basic_format_args

template< class... Args >
basic_format_args( const /*format-arg-store*/<Context, Args...>& store ) noexcept;

Constrói um objeto `basic_format_args` a partir do resultado de uma chamada para [std::make_format_args](<#/doc/utility/format/make_format_args>) ou [std::make_wformat_args](<#/doc/utility/format/make_format_args>).

## std::basic_format_args::get

[std::basic_format_arg](<#/doc/utility/format/basic_format_arg>)&lt;Context&gt; get( [std::size_t](<#/doc/types/size_t>) i ) const noexcept;

Retorna um [std::basic_format_arg](<#/doc/utility/format/basic_format_arg>) contendo o i-ésimo argumento em `args`, onde `args` é o pacote de parâmetros passado para [std::make_format_args](<#/doc/utility/format/make_format_args>) ou [std::make_wformat_args](<#/doc/utility/format/make_format_args>).

Se não houver tal argumento de formatação (ou seja, *this foi construído por padrão ou i não é menor que o número de argumentos de formatação), retorna um [std::basic_format_arg](<#/doc/utility/format/basic_format_arg>) construído por padrão (contendo um objeto [std::monostate](<#/doc/utility/variant/monostate>)).

### Guias de dedução

```cpp
template< class Context, class... Args >
basic_format_args( /*format-arg-store*/<Context, Args...> ) -> basic_format_args<Context>;  // (desde C++20)
```

### Notas

`std::basic_format_args` possui semântica de referência. É responsabilidade do programador garantir que *this não sobreviva a `store` (que, por sua vez, não deve sobreviver aos argumentos para [std::make_format_args](<#/doc/utility/format/make_format_args>) ou [std::make_wformat_args](<#/doc/utility/format/make_format_args>)).

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

RD | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P2216R3](<https://wg21.link/P2216R3>) | C++20 | `format_args_t` foi fornecido devido à superparametrização de `vformat_to` | removido
[LWG 3810](<https://cplusplus.github.io/LWG/issue3810>) | C++20 | `basic_format_args` não possui guia de dedução | adicionado
[LWG 4106](<https://cplusplus.github.io/LWG/issue4106>) | C++20 | `basic_format_args` era construível por padrão | construtor padrão removido

### Veja também

[ basic_format_arg](<#/doc/utility/format/basic_format_arg>)(C++20) | modelo de classe que fornece acesso a um argumento de formatação para formatadores definidos pelo usuário
(modelo de classe)