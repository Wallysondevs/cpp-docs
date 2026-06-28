# std::formatter

Definido no cabeçalho `[<format>](<#/doc/header/format>)`

```c
template< class T, class CharT = char >
struct formatter;
```

As especializações habilitadas de `std::formatter` definem regras de formatação para um dado tipo. Especializações habilitadas atendem aos requisitos [BasicFormatter](<#/doc/named_req/BasicFormatter>) e, a menos que especificado de outra forma, também atendem aos requisitos [Formatter](<#/doc/named_req/Formatter>).

Para todos os tipos `T` e `CharT` para os quais nenhuma especialização `std::formatter<T, CharT>` está habilitada, essa especialização é um tipo completo e está desabilitada.

Especializações desabilitadas não atendem aos requisitos [Formatter](<#/doc/named_req/Formatter>), e os seguintes são todos falsos:

  * [std::is_default_constructible_v](<#/doc/types/is_default_constructible>)
  * [std::is_copy_constructible_v](<#/doc/types/is_copy_constructible>)
  * [std::is_move_constructible_v](<#/doc/types/is_move_constructible>)
  * [std::is_copy_assignable_v](<#/doc/types/is_copy_assignable>)
  * [std::is_move_assignable_v](<#/doc/types/is_move_assignable>).

### Especializações padrão básicas

Na lista a seguir, `CharT` é char ou wchar_t, `ArithmeticT` é qualquer tipo aritmético não qualificado por cv diferente de char, wchar_t, char8_t, char16_t ou char32_t:

```cpp
Formatadores de caracteres
template<>
struct formatter<char, char>;  // (1)
template<>
struct formatter<char, wchar_t>;  // (2)
template<>
struct formatter<wchar_t, wchar_t>;  // (3)
Formatadores de strings
template<>
struct formatter<CharT*, CharT>;  // (4)
template<>
struct formatter<const CharT*, CharT>;  // (5)
template< std::size_t N >
struct formatter<CharT[N], CharT>;  // (6)
template< class Traits, class Alloc >
struct formatter<std::basic_string<CharT, Traits, Alloc>, CharT>;  // (7)
template< class Traits >
struct formatter<std::basic_string_view<CharT, Traits>, CharT>;  // (8)
Formatadores aritméticos
template<>
struct formatter<ArithmeticT, CharT>;  // (9)
Formatadores de ponteiros
template<>
struct formatter<std::nullptr_t, CharT>;  // (10)
template<>
struct formatter<void*, CharT>;  // (11)
template<>
struct formatter<const void*, CharT>;  // (12)
```

Formatadores para outros ponteiros e ponteiros para membros estão desabilitados.

Especializações como std::formatter<wchar_t, char> e std::formatter&lt;const char*, wchar_t&gt; que exigiriam conversões de codificação estão desabilitadas.

```cpp
As seguintes especializações ainda estão desabilitadas em C++23 para evitar a formatação de algumas sequências de char como ranges de wchar_t: | Formatadores desabilitados para wchar_t
template<>
struct formatter<char*, wchar_t>;  // (1)
template<>
struct formatter<const char*, wchar_t>;  // (2)
template< std::size_t N >
struct formatter<char[N], wchar_t>;  // (3)
template< class Traits, class Allocator >
struct formatter<std::basic_string<char, Traits, Allocator>, wchar_t>;  // (4)
template< class Traits >
struct formatter<std::basic_string_view<char, Traits>, wchar_t>;  // (5)
```

Uma especialização de formatter _habilitada para depuração_ fornece adicionalmente uma função membro pública não estática constexpr void set_debug_format(); que modifica o estado do objeto formatter para que ele formate os valores como [escapados e entre aspas](<#/doc/utility/format/spec>), como se o tipo do especificador de formato analisado pela última chamada a `parse` fosse `?`.

Cada especialização de formatter para tipo string ou caractere é _habilitada para depuração_.

(desde C++23)

### Especificação de formato padrão

| Esta seção está incompleta
Razão: A especificação de formato padrão foi movida para uma [página](<#/doc/utility/format/spec>) separada. O título da seção é temporariamente preservado para links para esta seção. Esta seção será removida depois que todos esses links forem resolvidos.

### Especializações padrão para tipos de biblioteca

[ std::formatter<std::chrono::duration>](<#/doc/chrono/duration/formatter>)(C++20) | suporte de formatação para `duration`
(especialização de template de classe)
[ std::formatter<std::chrono::sys_time>](<#/doc/chrono/system_clock/formatter>)(C++20) | suporte de formatação para `sys_time`
(especialização de template de classe)
[ std::formatter<std::chrono::utc_time>](<#/doc/chrono/utc_clock/formatter>)(C++20) | suporte de formatação para `utc_time`
(especialização de template de classe)
[ std::formatter<std::chrono::tai_time>](<#/doc/chrono/tai_clock/formatter>)(C++20) | suporte de formatação para `tai_time`
(especialização de template de classe)
[ std::formatter<std::chrono::gps_time>](<#/doc/chrono/gps_clock/formatter>)(C++20) | suporte de formatação para `gps_time`
(especialização de template de classe)
[ std::formatter<std::chrono::file_time>](<#/doc/chrono/file_clock/formatter>)(C++20) | suporte de formatação para `file_time`
(especialização de template de classe)
[ std::formatter<std::chrono::local_time>](<#/doc/chrono/local_t/formatter>)(C++20) | suporte de formatação para `local_time`
(especialização de template de classe)
[ std::formatter<std::chrono::day>](<#/doc/chrono/day/formatter>)(C++20) | suporte de formatação para `day`
(especialização de template de classe)
[ std::formatter<std::chrono::month>](<#/doc/chrono/month/formatter>)(C++20) | suporte de formatação para `month`
(especialização de template de classe)
[ std::formatter<std::chrono::year>](<#/doc/chrono/year/formatter>)(C++20) | suporte de formatação para `year`
(especialização de template de classe)
[ std::formatter<std::chrono::weekday>](<#/doc/chrono/weekday/formatter>)(C++20) | suporte de formatação para `weekday`
(especialização de template de classe)
[ std::formatter<std::chrono::weekday_indexed>](<#/doc/chrono/weekday_indexed/formatter>)(C++20) | suporte de formatação para `weekday_indexed`
(especialização de template de classe)
[ std::formatter<std::chrono::weekday_last>](<#/doc/chrono/weekday_last/formatter>)(C++20) | suporte de formatação para `weekday_last`
(especialização de template de classe)
[ std::formatter<std::chrono::month_day>](<#/doc/chrono/month_day/formatter>)(C++20) | suporte de formatação para `month_day`
(especialização de template de classe)
[ std::formatter<std::chrono::month_day_last>](<#/doc/chrono/month_day_last/formatter>)(C++20) | suporte de formatação para `month_day_last`
(especialização de template de classe)
[ std::formatter<std::chrono::month_weekday>](<#/doc/chrono/month_weekday/formatter>)(C++20) | suporte de formatação para `month_weekday`
(especialização de template de classe)
[ std::formatter<std::chrono::month_weekday_last>](<#/doc/chrono/month_weekday_last/formatter>)(C++20) | suporte de formatação para `month_weekday_last`
(especialização de template de classe)
[ std::formatter<std::chrono::year_month>](<#/doc/chrono/year_month/formatter>)(C++20) | suporte de formatação para `year_month`
(especialização de template de classe)
[ std::formatter<std::chrono::year_month_day>](<#/doc/chrono/year_month_day/formatter>)(C++20) | suporte de formatação para `year_month_day`
(especialização de template de classe)
[ std::formatter<std::chrono::year_month_day_last>](<#/doc/chrono/year_month_day_last/formatter>)(C++20) | suporte de formatação para `year_month_day_last`
(especialização de template de classe)
[ std::formatter<std::chrono::year_month_weekday>](<#/doc/chrono/year_month_weekday/formatter>)(C++20) | suporte de formatação para `year_month_weekday`
(especialização de template de classe)
[ std::formatter<std::chrono::year_month_weekday_last>](<#/doc/chrono/year_month_weekday_last/formatter>)(C++20) | suporte de formatação para `year_month_weekday_last`
(especialização de template de classe)
[ std::formatter<std::chrono::hh_mm_ss>](<#/doc/chrono/hh_mm_ss/formatter>)(C++20) | suporte de formatação para `hh_mm_ss`
(especialização de template de classe)
[ std::formatter<std::chrono::sys_info>](<#/doc/chrono/sys_info/formatter>)(C++20) | suporte de formatação para `sys_info`
(especialização de template de classe)
[ std::formatter<std::chrono::local_info>](<#/doc/chrono/local_info/formatter>)(C++20) | suporte de formatação para `local_info`
(especialização de template de classe)
[ std::formatter<std::chrono::zoned_time>](<#/doc/chrono/zoned_time/formatter>)(C++20) | suporte de formatação para `zoned_time`
(especialização de template de classe)
[ std::formatter<std::basic_stacktrace>](<#/doc/utility/basic_stacktrace/formatter>)(C++23) | suporte de formatação para `basic_stacktrace`
(especialização de template de classe)
[ std::formatter<std::stacktrace_entry>](<#/doc/utility/stacktrace_entry/formatter>)(C++23) | suporte de formatação para `stacktrace_entry`
(especialização de template de classe)
[ std::formatter<std::thread::id>](<#/doc/thread/thread/id/formatter>)(C++23) | suporte de formatação para `thread::id`
(especialização de template de classe)
[ std::formatter<std::vector&lt;bool&gt;::reference>](<#/doc/container/vector_bool/reference>)(C++23) | suporte de formatação para `vector<bool>::reference`
(especialização de template de classe)
[ std::formatter<_pair-or-tuple_ >](<#/doc/utility/format/tuple_formatter>)(C++23) | suporte de formatação para `pair` e `tuple`
(especialização de template de classe)
[ std::formatter<_range_ >](<#/doc/utility/format/ranges_formatter>)(C++23) | suporte de formatação para ranges
(especialização de template de classe)
[ std::formatter<std::stack>](<#/doc/container/stack/formatter>)(C++23) | suporte de formatação para `std::stack`
(especialização de template de classe)
[ std::formatter<std::queue>](<#/doc/container/queue/formatter>)(C++23) | suporte de formatação para `std::queue`
(especialização de template de classe)
[ std::formatter<std::priority_queue>](<#/doc/container/priority_queue/formatter>)(C++23) | suporte de formatação para `std::priority_queue`
(especialização de template de classe)
[ std::formatter<std::filesystem::path>](<#/doc/filesystem/path/formatter>)(C++26) | suporte de formatação para `filesystem::path`
(especialização de template de classe)

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <format>
    #include <iomanip>
    #include <iostream>
    #include <sstream>
    #include <string_view>
    
    struct QuotableString : std::string_view
    {};
    
    template<>
    struct std::formatter<QuotableString, char>
    {
        bool quoted = false;
    
        template<class ParseContext>
        constexpr ParseContext::iterator parse(ParseContext& ctx)
        {
            auto it = ctx.begin();
            if (it == ctx.end())
                return it;
    
            if (*it == '#')
            {
                quoted = true;
                ++it;
            }
            if (it != ctx.end() && *it != '}')
                throw std::format_error("Invalid format args for QuotableString.");
    
            return it;
        }
    
        template<class FmtContext>
        FmtContext::iterator format(QuotableString s, FmtContext& ctx) const
        {
            std::ostringstream out;
            if (quoted)
                out << std::quoted(s);
            else
                out << s;
    
            return std::ranges::copy(std::move(out).str(), ctx.out()).out;
        }
    };
    
    int main()
    {
        QuotableString a("be"), a2(R"( " be " )");
        QuotableString b("a question");
        std::cout << std::format("To {0} or not to {0}, that is {1}.\n", a, b);
        std::cout << std::format("To {0:} or not to {0:}, that is {1:}.\n", a, b);
        std::cout << std::format("To {0:#} or not to {0:#}, that is {1:#}.\n", a2, b);
    }
```

Saída:
```
    To be or not to be, that is a question.
    To be or not to be, that is a question.
    To " \" be \" " or not to " \" be \" ", that is "a question".
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3944](<https://cplusplus.github.io/LWG/issue3944>) | C++23 | algumas sequências de char eram formatáveis como ranges de wchar_t | desabilitar especializações adicionadas

### Veja também

[ basic_format_contextformat_contextwformat_context](<#/doc/utility/format/basic_format_context>)(C++20)(C++20)(C++20) | estado de formatação, incluindo todos os argumentos de formatação e o iterador de saída
(template de classe)
[ formattable](<#/doc/utility/format/formattable>)(C++23) | especifica que um tipo é formatável, ou seja, ele especializa **std::formatter** e fornece as funções membro `parse` e `format`
(concept)
[ range_formatter](<#/doc/utility/format/range_formatter>)(C++23) | template de classe que auxilia na implementação de especializações de **std::formatter** para tipos range
(template de classe)