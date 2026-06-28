# Requisitos nomeados C++: RandomNumberEngine (desde C++11)

Um random number engine é um objeto de função que retorna valores inteiros sem sinal, de modo que cada valor no intervalo de resultados possíveis tenha (idealmente) probabilidade igual.

Qualquer random number engine é também um [UniformRandomBitGenerator](<#/doc/named_req/UniformRandomBitGenerator>), e portanto pode ser conectado a qualquer [distribuição de números aleatórios](<#/doc/numeric/random>) para obter um número aleatório (formalmente, uma variável aleatória).

### Requisitos

Um tipo satisfaz RandomNumberEngine se ele satisfaz [UniformRandomBitGenerator](<#/doc/named_req/UniformRandomBitGenerator>) e, dados os seguintes tipos e valores, os requisitos semânticos e de complexidade na tabela abaixo são satisfeitos:

Tipo | Definição
---|---
`E` | um tipo RandomNumberEngine
`T` | `E::result_type`
Valor | Definição
e | um valor do tipo `E`
v | um lvalue do tipo `E`
x, y | valores do tipo (possivelmente qualificados com const) `E`
s | um valor do tipo `T`
q | um lvalue [SeedSequence](<#/doc/named_req/SeedSequence>)
z | um valor do tipo unsigned long long
os | um lvalue cujo tipo é uma especialização de [std::basic_ostream](<#/doc/io/basic_ostream>)
is | um lvalue cujo tipo é uma especialização de [std::basic_istream](<#/doc/io/basic_istream>)
n | o [tamanho](<#/doc/numeric/random>) do estado de `E`
TA | o [algoritmo de transição](<#/doc/numeric/random>) de `E`
GA | o [algoritmo de geração](<#/doc/numeric/random>) de `E`
Expressão | Tipo de retorno | Semântica | Complexidade
E() | N/A | Cria um engine com o mesmo estado inicial que todos os outros engines de tipo `E` construídos por padrão. | \\(\scriptsize O(n)\\)O(n)
E(x) | | Cria um engine que se compara como igual a x. | \\(\scriptsize O(n)\\)O(n)
E(s) | | Cria um engine cujo estado inicial é determinado por s. | \\(\scriptsize O(n)\\)O(n)
E(q) | | Cria um engine cujo estado inicial é determinado por uma única chamada a `q.generate`. | o mesmo que a complexidade de `q.generate` chamado em uma sequência cujo comprimento é n
e.seed() | void | Pós-condição: e == E(). | o mesmo que E()
e.seed(s) | void | Pós-condição: e == E(s). | o mesmo que E(s)
e.seed(q) | void | Pós-condição: e == E(q). | o mesmo que E(q)
e() | `T` | Avança o estado de e de `ei` para `ei+1` (i.e. TA(e`i`)) e retorna GA(e`i`). | constante amortizada
e.discard(z) | void | Avança o estado de e de `ei` para `ei+z` por quaisquer meios equivalentes a z chamadas consecutivas de e(). | não pior do que a complexidade de z chamadas consecutivas de e()
x == y | bool | Para todo inteiro positivo i, se as i-ésimas chamadas consecutivas de x() e y() retornam o mesmo valor, retorna true. Caso contrário, retorna false. | \\(\scriptsize O(n)\\)O(n)
x != y | bool | !(x == y) | \\(\scriptsize O(n)\\)O(n)
os << x | decltype(os)& | Com fmtflags definidos para [std::ios_base::dec](<#/doc/io/ios_base/fmtflags>) | [std::ios_base::left](<#/doc/io/ios_base/fmtflags>) e o caractere de preenchimento definido como o caractere de espaço, escreve em os a representação textual do estado atual de x.Pós-condição: os's fmtflags e o caractere de preenchimento são os mesmos de antes. | \\(\scriptsize O(n)\\)O(n)
is >> v | decltype(is)& | Com fmtflags definidos para [std::ios_base::dec](<#/doc/io/ios_base/fmtflags>), lê de is a representação textual do estado atual de v. Se uma entrada inválida for encontrada, garante que o estado de v permaneça inalterado pela operação e chama is.setstate([std::ios_base::failbit](<#/doc/io/ios_base/iostate>)) (o que pode lançar [std::ios_base::failure](<#/doc/io/ios_base/failure>)).Pré-condição: is fornece uma representação textual que foi previamente escrita usando um output stream pr satisfazendo todas as seguintes condições:

  * is.getloc() == pr.getloc() é true.
  * [std::is_same](<#/doc/types/is_same>)<decltype(is)::char_type,
` `decltype(pr)::char_type>::value é true.
  * [std::is_same](<#/doc/types/is_same>)<decltype(is)::traits_type,
` `decltype(pr)::traits_type>::value é true.

Pós-condição: os fmtflags de is são os mesmos de antes. | \\(\scriptsize O(n)\\)O(n)

### Biblioteca padrão

As seguintes facilidades da biblioteca padrão satisfazem RandomNumberEngine:

[ linear_congruential_engine](<#/doc/numeric/random/linear_congruential_engine>)(C++11) | implementa o algoritmo [linear congruential](<https://en.wikipedia.org/wiki/Linear_congruential_generator> "enwiki:Linear congruential generator")
---|---
(modelo de classe) |
[ mersenne_twister_engine](<#/doc/numeric/random/mersenne_twister_engine>)(C++11) | implementa o algoritmo [Mersenne twister](<https://en.wikipedia.org/wiki/Mersenne_twister> "enwiki:Mersenne twister")
(modelo de classe) |
[ subtract_with_carry_engine](<#/doc/numeric/random/subtract_with_carry_engine>)(C++11) | implementa um algoritmo subtract-with-carry ([Fibonacci defasado](<https://en.wikipedia.org/wiki/Lagged_Fibonacci_generator> "enwiki:Lagged Fibonacci generator"))
(modelo de classe) |
[ philox_engine](<#/doc/numeric/random/philox_engine>)(C++26) | um gerador paralelizável baseado em contador
(modelo de classe) |
[ discard_block_engine](<#/doc/numeric/random/discard_block_engine>)(C++11) | descarta parte da saída de um random number engine
(modelo de classe) |
[ independent_bits_engine](<#/doc/numeric/random/independent_bits_engine>)(C++11) | empacota a saída de um random number engine em blocos de um número especificado de bits
(modelo de classe) |
[ shuffle_order_engine](<#/doc/numeric/random/shuffle_order_engine>)(C++11) | entrega a saída de um random number engine em uma ordem diferente
(modelo de classe) |

As seguintes facilidades da biblioteca padrão satisfazem [UniformRandomBitGenerator](<#/doc/named_req/UniformRandomBitGenerator>) mas não RandomNumberEngine:

[ random_device](<#/doc/numeric/random/random_device>)(C++11) | gerador de números aleatórios não determinístico usando fonte de entropia de hardware
---|---
(classe) |
*[_(as is)_]: A::pointer