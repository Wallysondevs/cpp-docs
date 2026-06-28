# operator&lt;&lt;,&gt;&gt;(std::linear_congruential_engine)

```cpp
template< class CharT, class Traits >
friend std::basic_ostream<CharT, Traits>&
operator<<( std::basic_ostream<CharT, Traits>& os,
const linear_congruential_engine& e );  // (1) (desde C++11)
template< class CharT, class Traits >
friend std::basic_istream<CharT, Traits>&
operator>>( std::basic_istream<CharT, Traits>& is,
linear_congruential_engine& e );  // (2) (desde C++11)
```

  
1) Escreve a representação textual do estado atual de e para os com fmtflags definidos como [std::ios_base::dec](<#/doc/io/ios_base/fmtflags>) | [std::ios_base::left](<#/doc/io/ios_base/fmtflags>) e o caractere de preenchimento definido como o caractere de espaço.

Após a escrita, os fmtflags originais e o caractere de preenchimento de os são restaurados.

2) Lê uma representação textual do estado do engine de is (denotada como text) com fmtflags definidos como [std::ios_base::dec](<#/doc/io/ios_base/fmtflags>), e define o estado de e para esse estado.

Após a leitura, os fmtflags originais de is são restaurados. 

  * Se text não foi previamente escrito usando um output stream pr, o comportamento é indefinido. 
  * Caso contrário, se qualquer um dos seguintes valores for falso, o comportamento é indefinido: 

    

  * is.getloc() == pr.getloc()
  * [std::is_same](<#/doc/types/is_same>)<decltype(is)::char_type,  
decltype(pr)::char_type>::value
  * [std::is_same](<#/doc/types/is_same>)<decltype(is)::traits_type,  
decltype(pr)::traits_type>::value

  * Caso contrário, se text não for uma representação textual válida de qualquer estado de decltype(e), o estado de e permanece inalterado e is.setstate([std::ios_base::failbit](<#/doc/io/ios_base/iostate>)) é chamado. 
  * Caso contrário, dado outro engine eng do mesmo tipo que e. Se text foi previamente escrito por pr << eng e não houver invocações intervenientes de e ou de eng entre pr << eng e is >> e, e == eng é verdadeiro.

Esses function templates não são visíveis para [unqualified lookup](<#/doc/language/unqualified_lookup>) ou [qualified lookup](<#/doc/language/qualified_lookup>) comuns, e só podem ser encontrados por [argument-dependent lookup](<#/doc/language/adl>) quando decltype(e) é uma classe associada dos argumentos. 

### Parâmetros

os  |  \-  |  output stream para inserir os dados   
---|---|---
is  |  \-  |  input stream para extrair os dados   
e  |  \-  |  engine de números pseudoaleatórios   
  
### Valor de retorno

1) os

2) is

### Complexidade

1,2) Constante.

### Exceções

2) Pode lançar [std::ios_base::failure](<#/doc/io/ios_base/failure>) ao definir [std::ios_base::failbit](<#/doc/io/ios_base/iostate>).

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3519](<https://cplusplus.github.io/LWG/issue3519>) | C++11  | a forma dos operadores de inserção e extração era não especificada  | especificado como hidden friends 