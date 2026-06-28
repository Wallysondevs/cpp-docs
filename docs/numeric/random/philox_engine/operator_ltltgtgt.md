# operator&lt;&lt;,&gt;&gt;(std::philox_engine)

```cpp
template< class CharT, class Traits >
friend std::basic_ostream<CharT, Traits>&
operator<<( std::basic_ostream<CharT, Traits>& os,
const philox_engine& e );  // (1) (desde C++26)
template< class CharT, class Traits >
friend std::basic_istream<CharT, Traits>&
operator>>( std::basic_istream<CharT, Traits>& is,
philox_engine& e );  // (2) (desde C++26)
```

  
1) Escreve a representação textual do estado atual de `e` para `os` com `fmtflags` definidos para [std::ios_base::dec](<#/doc/io/ios_base/fmtflags>) | [std::ios_base::left](<#/doc/io/ios_base/fmtflags>) e o caractere de preenchimento definido como o caractere de espaço.

Após a escrita, os `fmtflags` originais e o caractere de preenchimento de `os` são restaurados.

2) Lê uma representação textual do estado do motor de `is` (denotado como `text`) com `fmtflags` definidos para [std::ios_base::dec](<#/doc/io/ios_base/fmtflags>), e define o estado de `e` para esse estado.

Após a leitura, os `fmtflags` originais de `is` são restaurados. 

  * Se `text` não foi previamente escrito usando um `output stream` `pr`, o comportamento é indefinido. 
  * Caso contrário, se qualquer um dos seguintes valores for falso, o comportamento é indefinido: 

    

  * `is.getloc() == pr.getloc()`
  * [std::is_same](<#/doc/types/is_same>)<decltype(is)::char_type,  
decltype(pr)::char_type>::value
  * [std::is_same](<#/doc/types/is_same>)<decltype(is)::traits_type,  
decltype(pr)::traits_type>::value

  * Caso contrário, se `text` não for uma representação textual válida de qualquer estado de `decltype(e)`, o estado de `e` permanece inalterado e `is.setstate([std::ios_base::failbit](<#/doc/io/ios_base/iostate>))` é chamado. 
  * Caso contrário, dado outro motor `eng` do mesmo tipo que `e`. Se `text` foi previamente escrito por `pr << eng` e não houver invocações intervenientes de `e` ou de `eng` entre `pr << eng` e `is >> e`, `e == eng` é verdadeiro.

Esses `function templates` não são visíveis para `lookup` não qualificado ou qualificado comum, e só podem ser encontrados por `argument-dependent lookup` quando `decltype(e)` é uma classe associada dos argumentos. 

### Parameters

os  |  \-  |  stream de saída para inserir os dados   
---|---|---
is  |  \-  |  stream de entrada para extrair os dados   
e  |  \-  |  motor de números pseudoaleatórios   
  
### Return value

1) os

2) is

### Complexity

1,2) \\(\scriptsize O(n) \\)O(n).

### Exceptions

2) Pode lançar [std::ios_base::failure](<#/doc/io/ios_base/failure>) ao definir [std::ios_base::failbit](<#/doc/io/ios_base/iostate>).