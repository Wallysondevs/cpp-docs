# std::enable_nonlocking_formatter_optimization

Definido no cabeçalho `[<format>](<#/doc/header/format>)`

```c
template< class T >
constexpr bool enable_nonlocking_formatter_optimization = false;
```

Este template pode ser usado por implementações para habilitar implementações eficientes de [`std::print`](<#/doc/io/print>) e [`std::println`](<#/doc/io/println>).

Se `std::enable_nonlocking_formatter_optimization<T>` for verdadeiro, a impressão de um argumento do tipo `T` pode ser realizada de uma maneira mais eficiente (veja [`std::print`](<#/doc/io/print>) para detalhes). As especializações de `std::enable_nonlocking_formatter_optimization` podem ser verdadeiras nos seguintes casos:

  * `T` é um dos tipos onde [`std::formatter`](<#/doc/utility/format/formatter>)<T, CharT> é uma [especialização padrão básica](<#/doc/utility/format/formatter>) ou [especialização padrão para um tipo de biblioteca](<#/doc/utility/format/formatter>) (veja abaixo).
  * Um programa pode especializar este template para qualquer tipo `T` [definido pelo programa](<#/doc/language/type-id>) sem qualificadores cv. Tais especializações devem ser [utilizáveis em expressões constantes](<#/doc/language/constant_expression>) e ter o tipo const bool.

### Especializações padrão básicas

Na lista a seguir, `CharT` é char ou wchar_t, `ArithmeticT` é qualquer tipo aritmético sem qualificadores cv diferente de char, wchar_t, char8_t, char16_t ou char32_t:

```cpp
Flag de não-bloqueio para formatadores de caractere
template<>
constexpr bool enable_nonlocking_formatter_optimization<CharT> = true;  // (1)
Flag de não-bloqueio para formatadores de string
template<>
constexpr bool enable_nonlocking_formatter_optimization<CharT*> = true;  // (2)
template<>
constexpr bool enable_nonlocking_formatter_optimization<const CharT*> = true;  // (3)
template< std::size_t N >
constexpr bool enable_nonlocking_formatter_optimization<CharT[N]> = true;  // (4)
template< class Traits, class Alloc >
constexpr bool enable_nonlocking_formatter_optimization
<std::basic_string<CharT, Traits, Alloc>> = true;  // (5)
template< class Traits >
constexpr bool enable_nonlocking_formatter_optimization
<std::basic_string_view<CharT, Traits>> = true;  // (6)
Flag de não-bloqueio para formatadores aritméticos
template<>
constexpr bool enable_nonlocking_formatter_optimization<ArithmeticT> = true;  // (7)
Flag de não-bloqueio para formatadores de ponteiro
template<>
constexpr bool enable_nonlocking_formatter_optimization<std::nullptr_t> = true;  // (8)
template<>
constexpr bool enable_nonlocking_formatter_optimization<void*> = true;  // (9)
template<>
constexpr bool enable_nonlocking_formatter_optimization<const void*> = true;  // (10)
```

### Especializações padrão para tipos de biblioteca

Especializações de `enable_nonlocking_formatter_optimization` para todas as especializações dos seguintes templates padrão são definidas como verdadeiras:

  * [`std::chrono::zoned_time`](<#/doc/chrono/zoned_time>) quando seu tipo de parâmetro de template `TimeZonePtr` é const [std::chrono::time_zone](<#/doc/chrono/time_zone>)*

Especializações de `enable_nonlocking_formatter_optimization` para todas as especializações dos seguintes templates padrão são definidas como condicionalmente verdadeiras:

  * [`std::pair`](<#/doc/utility/pair>)
  * [`std::tuple`](<#/doc/utility/tuple>)
  * [`std::chrono::duration`](<#/doc/chrono/duration>)

A especialização de `enable_nonlocking_formatter_optimization` para todos os [tipos de range formatáveis](<#/doc/utility/format/ranges_formatter>) é sempre definida como falsa para os quais o tipo de formato de range não é std::range_format::disabled.

### Notas

Macro de teste de recurso | Valor | Std | Recurso
---|---
[`__cpp_lib_print`](<#/doc/feature_test>) | [`202403L`](<#/>) | (C++26)
(DR23) | Saída formatada com bloqueio de stream
[`202406L`](<#/>) | (C++26)
(DR23) | Habilitando a otimização de formatador sem bloqueio para mais tipos formatáveis

### Veja também

[ formatter](<#/doc/utility/format/formatter>)(C++20) | define regras de formatação para um dado tipo
(template de classe)
[ print](<#/doc/io/print>)(C++23) | imprime para [`stdout`](<#/doc/io/c/std_streams>) ou um stream de arquivo usando representação [formatada](<#/doc/utility/format>) dos argumentos
(template de função)
[ println](<#/doc/io/println>)(C++23) | o mesmo que std::print, exceto que cada impressão é terminada por uma nova linha adicional
(template de função)