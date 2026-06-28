# Requisitos nomeados C++: BitmaskType

Define um tipo que pode ser usado para representar um conjunto de valores constantes ou qualquer combinação desses valores. Essa característica é tipicamente implementada por tipos inteiros, [std::bitset](<#/doc/utility/bitset>), ou enumerações (com escopo e sem escopo) com sobrecargas de operador adicionais.

### Requisitos

O tipo bitmask suporta um número finito de elementos bitmask, que são valores distintos e não-zero do tipo bitmask, de tal forma que, para qualquer par Ci e Cj, Ci & Ci é não-zero e Ci & Cj é zero. Além disso, o valor ​0​ é usado para representar uma bitmask vazia, sem valores definidos.

Os operadores bit a bit operator&, operator|, operator^, operator~, operator&=, operator|=, e operator^= são definidos para valores do tipo bitmask e possuem a mesma semântica que os operadores embutidos correspondentes em inteiros sem sinal teriam se os elementos bitmask fossem as distintas potências de dois inteiras.

As seguintes expressões são bem-formadas e têm o seguinte significado para qualquer BitmaskType:

X |= Y | define o valor `Y` no objeto `X`
---|---
X &= ~Y | limpa o valor `Y` no objeto `X`
X & Y | resultado não-zero indica que o valor `Y` está definido no objeto `X`

Cada elemento bitmask representável é definido como um valor inline(desde C++17) constexpr do tipo bitmask.

### Standard library

Os seguintes tipos da standard library satisfazem BitmaskType:

  * [`std::chars_format`](<#/doc/utility/chars_format>)

| (desde C++17)

  * [std::ctype_base::mask](<#/doc/locale/ctype_base>)
  * [std::ios_base::fmtflags](<#/doc/io/ios_base/fmtflags>)
  * [std::ios_base::iostate](<#/doc/io/ios_base/iostate>)
  * [std::ios_base::openmode](<#/doc/io/ios_base/openmode>)

  * [`std::regex_traits::char_class_type`](<#/doc/regex/regex_traits>)

| (desde C++11)

  * [std::regex_constants::syntax_option_type](<#/doc/regex/syntax_option_type>)

| (desde C++11)

  * [std::regex_constants::match_flag_type](<#/doc/regex/match_flag_type>)

| (desde C++11)

  * [std::launch](<#/doc/thread/launch>)

| (desde C++11)

  * [std::filesystem::perms](<#/doc/filesystem/perms>)

| (desde C++17)

  * [`std::filesystem::perm_options`](<#/doc/filesystem/perm_options>)

| (desde C++17)

  * [std::filesystem::copy_options](<#/doc/filesystem/copy_options>)

| (desde C++17)

  * [std::filesystem::directory_options](<#/doc/filesystem/directory_options>)

| (desde C++17)

Código que depende de alguma opção de implementação particular (por exemplo, int n = [std::ios_base::hex](<#/doc/io/ios_base/fmtflags>)) não é portável porque [std::ios_base::fmtflags](<#/doc/io/ios_base/fmtflags>) não é necessariamente implicitamente conversível para int.
*[_(as is)_]: A::pointer