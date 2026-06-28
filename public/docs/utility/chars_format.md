# std::chars_format

Definido no cabeçalho `[<charconv>](<#/doc/header/charconv>)`

```c
enum class chars_format {
scientific = /*unspecified*/,
fixed = /*unspecified*/,
hex = /*unspecified*/,
general = fixed
};
```

Um [BitmaskType](<#/doc/named_req/BitmaskType>) usado para especificar a formatação de ponto flutuante para [`std::to_chars`](<#/doc/utility/to_chars>) e [`std::from_chars`](<#/doc/utility/from_chars>).

### Notas

Teste de recurso macro | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_to_chars`](<#/doc/feature_test>) | [`201611L`](<#/>) | (C++17) | Conversões de string elementares (std::to_chars, std::from_chars)

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ to_chars](<#/doc/utility/to_chars>)(C++17) | converte um valor inteiro ou de ponto flutuante para uma sequência de caracteres
(função)
[ from_chars](<#/doc/utility/from_chars>)(C++17) | converte uma sequência de caracteres para um valor inteiro ou de ponto flutuante
(função)