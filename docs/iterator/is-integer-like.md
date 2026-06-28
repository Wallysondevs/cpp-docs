# is-integer-like ﻿, is-signed-integer-like

```cpp
template< class T >
constexpr bool /*is-integer-like*/ = /* see description */;  // (1) (desde C++20)
(apenas para exposição*)
template< class T >
constexpr bool /*is-signed-integer-like*/ = /* see description */;  // (2) (desde C++20)
(apenas para exposição*)
```

  
1) /*is-integer-like*/&lt;T&gt; é verdadeiro se e somente se `T` é um tipo integer-like.

2) /*is-signed-integer-like*/&lt;T&gt; é verdadeiro se e somente se `T` é um tipo signed-integer-like.

### Tipo integer-class

Um tipo `T` é um _tipo integer-class_ se ele pertence a um conjunto de tipos definidos pela implementação que se comportam como [tipos inteiros](<#/doc/language/types>), conforme definido [abaixo](<#/doc/iterator/is-integer-like>). Um tipo integer-class não é necessariamente um [tipo de classe](<#/doc/language/classes>). 

Um tipo integer-class pode representar \\(\scriptsize 2^N \\)2N inteiros consecutivos, onde N, um inteiro positivo, é chamado de _largura_ do tipo integer-class. 

Um tipo integer-class é assinado ou não assinado: 

  * Um _tipo de classe de inteiro assinado_ pode representar todos os inteiros em `[`\\(\scriptsize -2^{N-1} \\)-2N-1 `, `\\(\scriptsize 2^{N-1}-1 \\)2N-1 -1`]`, onde N é maior que a largura de todo tipo integral assinado. 
  * Um _tipo de classe de inteiro não assinado_ pode representar todos os inteiros em `[`\\(\scriptsize 0 \\)0`, `\\(\scriptsize 2^N-1 \\)2N -1`]`, onde N é maior que a largura de todo tipo integral não assinado. 

Todos os tipos integer-class modelam [`regular`](<#/doc/concepts/regular>) e [`three_way_comparable`](<#/doc/utility/compare/three_way_comparable>)<[std::strong_ordering](<#/doc/utility/compare/strong_ordering>)>. 

Um objeto [value-initialized](<#/doc/language/value_initialization>) de tipo integer-class tem o valor â0â. 

Uma expressão E de tipo integer-class `T` é [contextualmente conversível](<#/doc/language/implicit_cast>) para bool como se por bool(E != T(0)). 

### Tipo integer-like

Um tipo diferente de bool (possivelmente cv-qualified) é _integer-like_ se ele modela [`integral`](<#/doc/concepts/integral>) ou se é um tipo integer-class. 

  * Um tipo integer-like é _signed-integer-like_ se ele modela [`signed_integral`](<#/doc/concepts/signed_integral>) ou se é um tipo signed-integer-class. 
  * Um tipo integer-like é _unsigned-integer-like_ se ele modela [`unsigned_integral`](<#/doc/concepts/unsigned_integral>) ou se é um tipo unsigned-integer-class. 

### Comportamentos requeridos

Expressões de tipo integer-class são explicitamente conversíveis para qualquer tipo integer-like, e implicitamente conversíveis para qualquer tipo integer-class de largura igual ou maior e a mesma sinalização. Expressões de tipo integral são tanto implícita quanto explicitamente conversíveis para qualquer tipo integer-class. Conversões entre tipos integrais e integer-class e entre dois tipos integer-class não saem via uma exceção. O resultado de tal conversão é o valor único do tipo de destino que é congruente à fonte módulo \\(\scriptsize 2^N \\)2N , onde N é a largura do tipo de destino. 

Seja `Int<T>` denotando o seguinte tipo: 

  * Se `T` é um tipo integer-class, `Int<T>` é um [tipo inteiro estendido](<#/doc/language/types>) hipotético único da mesma sinalização com a mesma largura que `T`. 
  * Se `T` é um tipo integral, seja `Int<T>` o mesmo tipo que `T`. 

Dados os seguintes tipos, valores e operadores: 

Tipo  |  Definição   
---|---
`IC` |  um tipo integer-class   
`IL` |  um tipo integer-like   
Valor  |  Definição   
a |  um objeto do tipo `IC`  
b |  um objeto do tipo `IL`  
c |  um lvalue de um tipo integral   
x |  um objeto do tipo `Int<IC>` que representa o mesmo valor que a  
y |  um objeto do tipo `Int<IL>` que representa o mesmo valor que b  
Operador  |  Definição   
@= |  um de +=, -=, *=, /=, %=, &=, |=, ^=, <<= e >>=  
@ |  um de +, -, *, /, %, &, |, ^, <<, >>, &&, ||, ==, !=, <, >, <=, >=, <=> e ,  
  
As seguintes expressões devem ser bem-formadas e ter seu resultado e efeitos especificados se as condições especificadas forem satisfeitas: 

Expressão  |  Condição  | Resultado  | Efeitos
---|---|---|---
a++ |  Nenhuma condição | um prvalue do tipo `IC` cujo valor é igual ao de a antes da avaliação  | modifica o valor de a adicionando 1 a ele   
a\-- | modifica o valor de a subtraindo 1 dele   
++a | [expression-equivalent](<#/doc/language/expressions>) a a += 1  
\--a | expression-equivalent a a -= 1  
&a | expression-equivalent a [std::addressof](<#/doc/memory/addressof>)(a)  
!a | !x é bem-formado  | o mesmo que !x  
+a | +x é bem-formado  | o mesmo que +x, mas tem o tipo `IC` | o mesmo que +x  
-a | -x é bem-formado  | o mesmo que -x, mas tem o tipo `IC` | o mesmo que -x  
~a | ~x é bem-formado  | o mesmo que ~x, mas tem o tipo `IC` | o mesmo que ~x  
c @= a | c @= x é bem-formado  | um lvalue referindo-se a c | o mesmo que c @= x  
a @= b | x @= y é bem-formado  | um lvalue referindo-se a a | o mesmo que x @= y, exceto que o valor que seria armazenado em x é armazenado em a  
a @ b | x @ y é bem-formado  | o mesmo que x @ y, mas o tipo de resultado é diferente: 

  * Se x @ y é do tipo `Int<IC>`, o resultado tem o tipo `IC`. 
  * Se x @ y é do tipo `Int<IL>`, o resultado tem o tipo `IL`. 
  * Se x @ y é de qualquer outro tipo `T`, o resultado tem o tipo `T`. 

| o mesmo que x @ y  
b @ a | y @ x é bem-formado  | o mesmo que y @ x, mas o tipo de resultado é diferente: 

  * Se y @ x é do tipo `Int<IC>`, o resultado tem o tipo `IC`. 
  * Se y @ x é do tipo `Int<IL>`, o resultado tem o tipo `IL`. 
  * Se y @ x é de qualquer outro tipo `T`, o resultado tem o tipo `T`. 

| o mesmo que y @ x  
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 3366](<https://cplusplus.github.io/LWG/issue3366>)  
([P2393R1](<https://wg21.link/P2393R1>))  | C++20  | a conversão entre um tipo integer-class e seu tipo inteiro correspondente não era garantida para produzir um valor representável  | garantido   
[LWG 3376](<https://cplusplus.github.io/LWG/issue3376>)  
([P2393R1](<https://wg21.link/P2393R1>))  | C++20  | tipos integer-class só podiam ser tipos de classe  | também permitia tipos não-classe   
---|---|---|---
[LWG 3467](<https://cplusplus.github.io/LWG/issue3467>) | C++20  | bool era considerado um tipo integer-like  | excluído   
[LWG 3575](<https://cplusplus.github.io/LWG/issue3575>)  
([P2393R1](<https://wg21.link/P2393R1>))  | C++20  | tipos integer-class não eram garantidos como three-way-comparable  | garantido   
  
### Veja também

[ weakly_incrementable](<#/doc/iterator/weakly_incrementable>)(C++20) |  especifica que um tipo [`semiregular`](<#/doc/concepts/semiregular>) pode ser incrementado com operadores de pré e pós-incremento   
(concept)  