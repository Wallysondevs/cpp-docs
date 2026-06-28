# std::chrono::zoned_traits

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template < class TimeZonePtr >
struct zoned_traits { };
template <>
struct zoned_traits<const std::chrono::time_zone*>;
```

A classe `zoned_traits` fornece uma maneira de personalizar o comportamento dos construtores de `std::chrono::zoned_time` com tipos de ponteiro de fuso horário personalizados. Em particular, ela permite que tais tipos especifiquem o fuso horário padrão a ser usado e o mapeamento do nome de um fuso horário para o ponteiro de fuso horário correspondente. É aceitável que tipos de ponteiro de fuso horário personalizados não suportem nenhuma das operações, caso em que os construtores correspondentes de `zoned_time` não participarão da resolução de sobrecarga.

O template primário é vazio. Uma especialização é fornecida para `const [std::chrono::time_zone](<#/doc/chrono/time_zone>)*`, o tipo de ponteiro de fuso horário padrão.

### Funções membro

## std::chrono::zoned_traits&lt;const std::chrono::time_zone*&gt;::default_zone

static const [std::chrono::time_zone](<#/doc/chrono/time_zone>)* default_zone();

Retorna um ponteiro de fuso horário para o fuso horário padrão (UTC).

### Valor de retorno

`[std::chrono::locate_zone](<#/doc/chrono/locate_zone>)("UTC").`

## std::chrono::zoned_traits&lt;const std::chrono::time_zone*&gt;::locate_zone

static const [std::chrono::time_zone](<#/doc/chrono/time_zone>)* locate_zone([std::string_view](<#/doc/string/basic_string_view>) name);

Retorna o ponteiro de fuso horário para o fuso horário designado por `name`.

### Valor de retorno

`[std::chrono::locate_zone](<#/doc/chrono/locate_zone>)(name).`