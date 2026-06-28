# std::basic_format_parse_context

Definido no cabeçalho `[<format>](<#/doc/header/format>)`

```c
template< class CharT >
class basic_format_parse_context;
```

Fornece acesso ao estado de análise da string de formato, consistindo no range da string de formato sendo analisada e no contador de argumentos para indexação automática.

Uma instância de `std::basic_format_parse_context` é passada para [Formatter](<#/doc/named_req/Formatter>) ao analisar a especificação de formato.

Um programa que declara uma especialização explícita ou parcial de `std::basic_format_parse_context` é malformado, sem diagnóstico requerido.

Vários typedefs para tipos de caracteres comuns são fornecidos:

Definido no cabeçalho `[<format>](<#/doc/header/format>)`
---
Tipo | Definição
---|---
`std::format_parse_context` | std::basic_format_parse_context&lt;char&gt;
`std::wformat_parse_context` | std::basic_format_parse_context<wchar_t>

### Tipos de membros

Tipo | Definição
---|---
`char_type` | `CharT`
`iterator` | [std::basic_string_view](<#/doc/string/basic_string_view>)&lt;CharT&gt;::const_iterator
`const_iterator` | [std::basic_string_view](<#/doc/string/basic_string_view>)&lt;CharT&gt;::const_iterator

### Funções membro

(construtor) | constrói uma instância de `std::basic_format_parse_context` a partir da string de formato e da contagem de argumentos
(função membro pública)
operator=[deleted] | `std::basic_format_parse_context` não é copiável
(função membro pública)
begin | retorna um iterator para o início do range da string de formato
(função membro pública)
end | retorna um iterator para o fim do range da string de formato
(função membro pública)
advance_to | avança o iterator de início para a posição fornecida
(função membro pública)
next_arg_id | entra no modo de indexação automática e retorna o próximo índice de argumento
(função membro pública)
check_arg_id | entra no modo de indexação manual, verifica se o índice de argumento fornecido está no range
(função membro pública)
check_dynamic_spec(C++26) | verifica se o tipo do argumento de formato correspondente com o índice de argumento fornecido está nos argumentos de template de tipo fornecidos
(função membro pública)
check_dynamic_spec_integral(C++26) | verifica se o tipo do argumento de formato correspondente com o índice de argumento fornecido é um tipo integral
(função membro pública)
check_dynamic_spec_string(C++26) | verifica se o tipo do argumento de formato correspondente com o índice de argumento fornecido é um tipo string
(função membro pública)

## std::basic_format_parse_context::basic_format_parse_context

```cpp
  // (1)
constexpr explicit
basic_format_parse_context( std::basic_string_view<CharT> fmt,
std::size_t num_args = 0 ) noexcept; | | (ate C++26)
constexpr explicit
basic_format_parse_context( std::basic_string_view<CharT> fmt ) noexcept;  // (desde C++26)
basic_format_parse_context( const basic_format_parse_context& ) = delete;  // (2)
```

1) Constrói uma instância de `std::basic_format_parse_context`. Inicializa o range da string de formato para `[`fmt.begin()`, `fmt.end()`)`, e a contagem de argumentos para num_args(ate C++26)​0​(desde C++26). Qualquer chamada para `next_arg_id`, `check_arg_id`, ou `check_dynamic_spec` em uma instância de `std::basic_format_parse_context` inicializada usando este construtor não é uma core constant expression. | (desde C++26)

2) O construtor de cópia é deletado. `std::basic_format_parse_context` não é copiável.

## std::basic_format_parse_context::begin

constexpr const_iterator begin() const noexcept;

Retorna um iterator para o início do range da string de formato.

## std::basic_format_parse_context::end

constexpr const_iterator end() const noexcept;

Retorna um iterator para o fim do range da string de formato.

## std::basic_format_parse_context::advance_to

constexpr void advance_to( const_iterator it );

Define o início do range da string de formato para it. Após uma chamada para `advance_to()`, chamadas subsequentes para `begin()` retornarão uma cópia de it.

O comportamento é indefinido se end() não for [alcançável](<#/doc/iterator>) a partir de it.

## std::basic_format_parse_context::next_arg_id

constexpr [std::size_t](<#/doc/types/size_t>) next_arg_id();

Entra no modo de indexação automática de argumentos e retorna o próximo índice de argumento, começando de 0.

Se *this já tiver entrado no modo de indexação manual de argumentos, lança [std::format_error](<#/doc/utility/format/format_error>).

Se o próximo índice de argumento for maior ou igual a num_args fornecido no construtor, a chamada não é uma core constant expression.

## std::basic_format_parse_context::check_arg_id

constexpr void check_arg_id( [std::size_t](<#/doc/types/size_t>) id );

Entra no modo de indexação manual de argumentos.

Se *this já tiver entrado no modo de indexação automática de argumentos, lança [std::format_error](<#/doc/utility/format/format_error>).

Se id for maior ou igual a num_args fornecido no construtor, a chamada não é uma core constant expression.

## std::basic_format_parse_context::check_dynamic_spec

```cpp
template< class... Ts >
constexpr void check_dynamic_spec( std::size_t id ) noexcept;  // (desde C++26)
```

Se id for maior ou igual a num_args fornecido no construtor ou o tipo do argumento de formato correspondente (após conversão para [std::basic_format_arg](<#/doc/utility/format/basic_format_arg>)) não for um dos tipos em Ts..., a chamada não é uma core constant expression. Uma chamada para check_dynamic_spec não tem efeito em tempo de execução.

O programa é malformado a menos que sizeof...(Ts) >= 1, os tipos em Ts... sejam únicos, e cada tipo seja um de bool, char_type, int, unsigned int, long long int, unsigned long long int, float, double, long double, const char_type*, [std::basic_string_view](<#/doc/string/basic_string_view>)<char_type>, ou const void*.

## std::basic_format_parse_context::check_dynamic_spec_integral

```cpp
constexpr void check_dynamic_spec_integral( std::size_t id ) noexcept;  // (desde C++26)
```

Equivalente a chamar check_dynamic_spec<int, unsigned int, long long int, unsigned long long int>(id). Uma chamada para check_dynamic_spec_integral não tem efeito em tempo de execução.

## std::basic_format_parse_context::check_dynamic_spec_string

```cpp
constexpr void check_dynamic_spec_string( std::size_t id ) noexcept;  // (desde C++26)
```

Equivalente a chamar check_dynamic_spec<const char_type*, [std::basic_string_view](<#/doc/string/basic_string_view>)<char_type>>(id). Uma chamada para check_dynamic_spec_string não tem efeito em tempo de execução.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3825](<https://cplusplus.github.io/LWG/issue3825>) | C++20 | `check_arg_id` tem uma verificação de id de argumento em tempo de compilação, mas `next_arg_id` não tinha | adicionado
[LWG 3975](<https://cplusplus.github.io/LWG/issue3975>) | C++20 | especialização de usuário de `basic_format_parse_context` era permitida | não permitida