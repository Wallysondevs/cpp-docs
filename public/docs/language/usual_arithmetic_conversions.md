# Conversões aritméticas usuais

Muitos operadores binários que esperam operandos de tipo [aritmético](<#/doc/language/type-id>) ou de [enumeração](<#/doc/language/enum>) causam conversões e produzem tipos de resultado de maneira similar. O objetivo é produzir um tipo comum, que também é o tipo do resultado. Este padrão é chamado de _conversões aritméticas usuais_.

### Definição

As conversões aritméticas usuais são definidas da seguinte forma:

#### Estágio 1

Aplica a [conversão de lvalue para rvalue](<#/doc/language/implicit_cast>) a ambos os operandos; os prvalues resultantes são usados no lugar dos operandos originais para o processo restante.

#### Estágio 2

  * Se qualquer um dos operandos for de [tipo de enumeração com escopo](<#/doc/language/enum>), nenhuma conversão é realizada; se o outro operando não tiver o mesmo tipo, a expressão é malformada.
  * Caso contrário, prossiga para o próximo estágio.

| (desde C++11)

#### Estágio 3

  * Se qualquer um dos operandos for de [tipo de enumeração](<#/doc/language/enum>), e o outro operando for de um tipo de enumeração diferente ou um tipo de ponto flutuante, a expressão é malformada.
  * Caso contrário, prossiga para o próximo estágio.

| (desde C++26)

#### Estágio 4

  * Se qualquer um dos operandos for de [tipo de ponto flutuante](<#/doc/language/types>), as seguintes regras são aplicadas:

  * Se ambos os operandos tiverem o mesmo tipo, nenhuma conversão adicional será realizada.
  * Caso contrário, se um dos operandos for de um tipo que não seja de ponto flutuante, esse operando é convertido para o tipo do outro operando.
  * Caso contrário, se os [ranks de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) dos tipos dos operandos forem ordenados mas (desde C++23) não iguais, então o operando do tipo com o menor rank de conversão de ponto flutuante é convertido para o tipo do outro operando.

  * Caso contrário, se os ranks de conversão de ponto flutuante dos tipos dos operandos forem iguais, então o operando com o menor [subrank de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) é convertido para o tipo do outro operando.
  * Caso contrário, a expressão é malformada.

| (desde C++23)

  * Caso contrário, ambos os operandos são de tipos inteiros, prossiga para o próximo estágio.

#### Estágio 5

Ambos os operandos são convertidos para um tipo comum `C`. Dados os tipos `T1` e `T2` como o tipo promovido ([sob as regras de promoções integrais](<#/doc/language/implicit_cast>)) dos operandos, as seguintes regras são aplicadas para determinar `C`:

  * Se `T1` e `T2` forem do mesmo tipo, `C` é esse tipo.
  * Caso contrário, se `T1` e `T2` forem ambos tipos inteiros com sinal ou ambos tipos inteiros sem sinal, `C` é o tipo com maior [rank de conversão de inteiro](<#/doc/language/usual_arithmetic_conversions>).
  * Caso contrário, um tipo entre `T1` e `T2` é um tipo inteiro com sinal `S`, o outro tipo é um tipo inteiro sem sinal `U`. Aplique as seguintes regras:

  * Se o rank de conversão de inteiro de `U` for maior ou igual ao rank de conversão de inteiro de `S`, `C` é `U`.
  * Caso contrário, se `S` puder representar todos os valores de `U`, `C` é `S`.
  * Caso contrário, `C` é o tipo inteiro sem sinal correspondente a `S`.

Se um operando for de tipo de enumeração e o outro operando for de um tipo de enumeração diferente ou um tipo de ponto flutuante, este comportamento é obsoleto. | (desde C++20) (até C++26)

### Rank de conversão de inteiro

Todo [tipo inteiro](<#/doc/language/types>) possui um _rank de conversão de inteiro_ definido da seguinte forma:

  * Nenhum tipo inteiro com sinal, exceto char e signed char (se char for com sinal), tem o mesmo rank, mesmo que tenham a mesma representação.
  * O rank de um tipo inteiro com sinal é maior do que o rank de qualquer tipo inteiro com sinal com uma largura menor.
  * Os ranks dos seguintes tipos inteiros diminuem em ordem:

  * long long

| (desde C++11)

  * long
  * int
  * short
  * signed char

  * O rank de qualquer tipo inteiro sem sinal é igual ao rank do tipo inteiro com sinal correspondente.

  * O rank de qualquer tipo inteiro padrão é maior do que o rank de qualquer tipo inteiro estendido com a mesma largura.

| (desde C++11)

  * O rank de bool é menor do que o rank de todos os tipos inteiros padrão.
  * Os ranks dos tipos de caracteres de codificação (char, char8_t (desde C++20), char16_t, char32_t (desde C++11) e wchar_t) são iguais aos ranks de seus [tipos subjacentes](<#/doc/language/types>), o que significa:

  * O rank de char é igual ao rank de signed char e unsigned char.

  * O rank de char8_t é igual ao rank de unsigned char.

| (desde C++20)

  * O rank de char16_t é igual ao rank de [std::uint_least16_t](<#/doc/types/integer>).
  * O rank de char32_t é igual ao rank de [std::uint_least32_t](<#/doc/types/integer>).

| (desde C++11)

  * O rank de wchar_t é igual ao rank de seu tipo subjacente definido pela implementação.

  * O rank de qualquer tipo inteiro com sinal estendido em relação a outro tipo inteiro com sinal estendido com a mesma largura é definido pela implementação, mas ainda sujeito às outras regras para determinar o rank de conversão de inteiro.

| (desde C++11)

  * Para todos os tipos inteiros `T1`, `T2` e `T3`, se `T1` tiver rank maior que `T2` e `T2` tiver rank maior que `T3`, então `T1` tem rank maior que `T3`.

O rank de conversão de inteiro também é usado na definição de [promoção integral](<#/doc/language/implicit_cast>).

### Rank e subrank de conversão de ponto flutuante

#### Rank de conversão de ponto flutuante

Todo [tipo de ponto flutuante](<#/doc/language/types>) possui um _rank de conversão de ponto flutuante_ definido da seguinte forma:

  * Os ranks dos tipos de ponto flutuante padrão diminuem em ordem:
    * long double
    * double
    * float

  * O rank de um tipo de ponto flutuante `T` é maior do que o rank de qualquer tipo de ponto flutuante cujo conjunto de valores é um subconjunto próprio do conjunto de valores de `T`.
  * Dois tipos de ponto flutuante estendidos com o mesmo conjunto de valores têm ranks iguais.
  * Um tipo de ponto flutuante estendido com o mesmo conjunto de valores que exatamente um tipo de ponto flutuante padrão cv-unqualified tem um rank igual ao rank desse tipo de ponto flutuante padrão.
  * Um tipo de ponto flutuante estendido com o mesmo conjunto de valores que mais de um tipo de ponto flutuante padrão cv-unqualified tem um rank igual ao rank de double.

| (desde C++23)

#### Subrank de conversão de ponto flutuante

Tipos de ponto flutuante que possuem ranks de conversão de ponto flutuante iguais são ordenados por _subrank de conversão de ponto flutuante_. O subrank forma uma ordem total entre tipos com ranks iguais. Os tipos `std::float16_t`, `std::float32_t`, `std::float64_t` e `std::float128_t` ([tipos de ponto flutuante de largura fixa](<#/doc/types/floating-point>)) têm um subrank de conversão maior do que qualquer tipo de ponto flutuante padrão com rank de conversão igual. Caso contrário, a ordem do subrank de conversão é definida pela implementação. | (desde C++23)

#### Uso

O rank e o subrank de conversão de ponto flutuante também são usados para

  * determinar se uma conversão entre diferentes tipos de ponto flutuante [pode ser implícita](<#/doc/language/implicit_cast>) ou é uma [conversão de estreitamento](<#/doc/language/list_initialization>),
  * [distinguir as sequências de conversão](<#/doc/language/overload_resolution>) na resolução de sobrecarga,

  * determinar o tipo real extraído por [`std::num_get::get()`](<#/doc/locale/num_get/get>) para a extração de um tipo de ponto flutuante estendido usando [`std::basic_istream::operator>>`](<#/doc/io/basic_istream/operator_gtgt>),
  * determinar o tipo real inserido por [`std::num_put::put()`](<#/doc/locale/num_put/put>) para a inserção de um tipo de ponto flutuante estendido usando [`std::basic_ostream::operator<<`](<#/doc/io/basic_ostream/operator_ltlt>),

| (desde C++23)

  * determinar se o [construtor de conversão](<#/doc/numeric/complex/complex>) de [std::complex](<#/doc/numeric/complex>) é explícito, ou
  * determinar o tipo de ponto flutuante comum se os argumentos de diferentes tipos de ponto flutuante forem passados para funções matemáticas [comuns](<#/doc/numeric/math>) ou [especiais](<#/doc/numeric/special_functions>).

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 1642](<https://cplusplus.github.io/CWG/issues/1642.html>) | C++98 | conversões aritméticas usuais podem envolver lvalues | aplica conversões de lvalue para rvalue primeiro
[CWG 2528](<https://cplusplus.github.io/CWG/issues/2528.html>) | C++20 | a comparação de três vias entre unsigned char
e unsigned int é malformada devido
à promoção integral intermediária[1](<#/doc/language/usual_arithmetic_conversions>) | determina o tipo comum com base
nos tipos promovidos, sem
realmente promover os operandos[2](<#/doc/language/usual_arithmetic_conversions>)
[CWG 2892](<https://cplusplus.github.io/CWG/issues/2892.html>) | C++98 | quando ambos os operandos são do mesmo
tipo de ponto flutuante, o significado de "nenhuma
conversão adicional é necessária" era incerto | alterado para "nenhuma conversão
adicional será realizada"

  1. [↑](<#/doc/language/usual_arithmetic_conversions>) Antes da resolução, unsigned char é promovido para int no início do estágio 5, então é convertido para unsigned int. No entanto, a última conversão é de estreitamento, o que torna a comparação de três vias malformada.
  2. [↑](<#/doc/language/usual_arithmetic_conversions>) Após a resolução, o tipo comum ainda é unsigned int. A diferença é que unsigned char é diretamente convertido para unsigned int sem a promoção integral intermediária. A conversão não é de estreitamento e, portanto, a comparação de três vias é bem formada.
