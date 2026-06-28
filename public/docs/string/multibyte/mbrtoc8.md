# std::mbrtoc8

Definido no cabeçalho `[<cuchar>](<#/doc/header/cuchar>)`

```c
std::size_t mbrtoc8( char8_t* pc8,
const char* s,
std::size_t n,
std::mbstate_t* ps );
```

Converte um caractere multibyte estreito para a codificação UTF-8.

Se s não for um ponteiro nulo, inspeciona no máximo n bytes da string de caractere multibyte, começando com o byte apontado por s, para determinar o número de bytes necessários para completar o próximo caractere multibyte (incluindo quaisquer sequências de deslocamento). Se a função determinar que o próximo caractere multibyte em s está completo e válido, ela o converte para UTF-8 e armazena a primeira unidade de código UTF-8 em *pc8 (se pc8 não for nulo).

Se a codificação UTF-8 do caractere multibyte em *s consistir em mais de uma unidade de código UTF-8, então, após a primeira chamada a esta função, *ps é atualizado de tal forma que a próxima chamada a `mbrtoc8` escreverá as unidades de código UTF-8 adicionais, sem considerar *s.

Se s for um ponteiro nulo, os valores de n e pc8 são ignorados e a chamada é equivalente a std::mbrtoc8(nullptr, "", 1, ps).

Se a unidade de código UTF-8 produzida for u8'\0', o estado de conversão *ps representa o estado de deslocamento inicial.

A codificação multibyte usada por esta função é especificada pela locale C atualmente ativa.

### Parâmetros

- **pc8** — ponteiro para o local onde as unidades de código UTF-8 resultantes serão escritas
- **s** — ponteiro para a string de caractere multibyte usada como entrada
- **n** — limite no número de bytes em s que podem ser examinados
- **ps** — ponteiro para o objeto de estado de conversão usado ao interpretar a string multibyte

### Valor de retorno

O primeiro dos seguintes que se aplica:

  * ​0​ se o caractere convertido de s (e armazenado em *pc8 se não nulo) foi o caractere nulo.
  * o número de bytes [1...n] do caractere multibyte convertido com sucesso de s.
  * static_cast<[std::size_t](<#/doc/types/size_t>)>(-3) se a próxima unidade de código UTF-8 de um caractere cuja codificação consiste em múltiplas unidades de código foi agora escrita em *pc8. Nenhum byte é processado da entrada neste caso.
  * static_cast<[std::size_t](<#/doc/types/size_t>)>(-2) se os próximos n bytes constituem um caractere multibyte incompleto, mas até agora válido. Nada é escrito em *pc8.
  * static_cast<[std::size_t](<#/doc/types/size_t>)>(-1) se ocorrer um erro de codificação. Nada é escrito em *pc8, o valor [EILSEQ](<#/doc/error/errno_macros>) é armazenado em [errno](<#/doc/error/errno>) e o valor de *ps é não especificado.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ c8rtomb](<#/doc/string/multibyte/c8rtomb>)(C++20) | converte string UTF-8 para codificação multibyte estreita
(função)
[ mbrtoc16](<#/doc/string/multibyte/mbrtoc16>)(C++11) | converte um caractere multibyte estreito para codificação UTF-16
(função)
[Documentação C](<#/>) para mbrtoc8