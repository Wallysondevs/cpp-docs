# std::valarray

Definido no cabeçalho `[<valarray>](<#/doc/header/valarray>)`

```c
template< class T >
class valarray;
```

`std::valarray` é a classe para representar e manipular arrays de valores. Ela suporta operações matemáticas elemento a elemento e várias formas de operadores de subscrito generalizados, fatiamento (slicing) e acesso indireto.

### Notas

`std::valarray` e classes auxiliares são definidas para serem livres de certas formas de aliasing, permitindo assim que as operações nessas classes sejam otimizadas de forma semelhante ao efeito da palavra-chave [`restrict`](<#/>) na linguagem de programação C. Além disso, funções e operadores que recebem argumentos `valarray` podem retornar objetos proxy para possibilitar que o compilador otimize uma expressão como `v1 = a * v2 + v3;` como um único loop que executa `v1[i] = a * v2[i] + v3[i];` evitando quaisquer temporários ou múltiplas passagens. No entanto, [expression templates](<https://en.wikipedia.org/wiki/expression_templates> "enwiki:expression templates") tornam a mesma técnica de otimização disponível para qualquer container C++, e a maioria das bibliotecas numéricas prefere expression templates a valarrays por sua flexibilidade. Algumas implementações da biblioteca padrão C++ usam expression templates para implementar operações eficientes em `std::valarray` (por exemplo, GNU libstdc++ e LLVM libc++). Raramente os valarrays são otimizados ainda mais, como por exemplo em [Intel Integrated Performance Primitives](<https://software.intel.com/en-us/node/684140>).

### Parâmetros de template

- **T** — o tipo dos elementos. O tipo deve satisfazer os requisitos de [NumericType](<#/doc/named_req/NumericType>)

### Tipos de membros

Tipo de membro | Definição
---|---
`value_type` | `T`

### Funções membro

[ (construtor)](<#/doc/numeric/valarray/valarray>) | constrói um novo array numérico
(função membro pública)
[ (destrutor)](<#/doc/numeric/valarray/~valarray>) | destrói o array numérico
(função membro pública)
[ operator=](<#/>) | atribui o conteúdo
(função membro pública)
[ operator[]](<#/doc/numeric/valarray/operator_at>) | obtém/define elemento de valarray, slice ou máscara
(função membro pública)
[ operator+operator-operator~operator!](<#/doc/numeric/valarray/operator_arith>) | aplica um operador aritmético unário a cada elemento do valarray
(função membro pública)
[ operator+=operator-=operator*=operator/=operator%=operator&=operator|=operator^=operator<<=operator>>=](<#/doc/numeric/valarray/operator_arith2>) | aplica um operador de atribuição composta a cada elemento do valarray
(função membro pública)
[ swap](<#/doc/numeric/valarray/swap>) | troca com outro valarray
(função membro pública)
[ size](<#/doc/numeric/valarray/size>) | retorna o tamanho do valarray
(função membro pública)
[ resize](<#/doc/numeric/valarray/resize>) | altera o tamanho do valarray
(função membro pública)
[ sum](<#/doc/numeric/valarray/sum>) | calcula a soma de todos os elementos
(função membro pública)
[ min](<#/doc/numeric/valarray/min>) | retorna o menor elemento
(função membro pública)
[ max](<#/doc/numeric/valarray/max>) | retorna o maior elemento
(função membro pública)
[ shift](<#/doc/numeric/valarray/shift>) | desloca os elementos do valarray preenchendo com zeros
(função membro pública)
[ cshift](<#/doc/numeric/valarray/cshift>) | deslocamento circular dos elementos do valarray
(função membro pública)
[ apply](<#/doc/numeric/valarray/apply>) | aplica uma função a cada elemento de um valarray
(função membro pública)

### Funções não-membro

[ std::swap(std::valarray)](<#/doc/numeric/valarray/swap2>)(desde C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(template de função)
[ std::begin(std::valarray)](<#/doc/numeric/valarray/begin2>)(desde C++11) | sobrecarrega [std::begin](<#/doc/iterator/begin>)
(template de função)
[ std::end(std::valarray)](<#/doc/numeric/valarray/end2>)(desde C++11) | especializa [std::end](<#/doc/iterator/end>)
(template de função)
[ operator+operator-operator*operator/operator%operator&operator|operator^operator<&lt;operator&gt;>operator&&operator||](<#/doc/numeric/valarray/operator_arith3>) | aplica operadores binários a cada elemento de dois valarrays, ou a um valarray e um valor
(template de função)
[ operator==operator!=operator<operator<=operator>operator>=](<#/doc/numeric/valarray/operator_cmp>) | compara dois valarrays ou um valarray com um valor
(template de função)
[ abs(std::valarray)](<#/doc/numeric/valarray/abs>) | aplica a função abs a cada elemento do valarray
(template de função)

##### Funções exponenciais

[ exp(std::valarray)](<#/doc/numeric/valarray/exp>) | aplica a função [std::exp](<#/doc/numeric/math/exp>) a cada elemento do valarray
(template de função)
[ log(std::valarray)](<#/doc/numeric/valarray/log>) | aplica a função [std::log](<#/doc/numeric/math/log>) a cada elemento do valarray
(template de função)
[ log10(std::valarray)](<#/doc/numeric/valarray/log10>) | aplica a função [std::log10](<#/doc/numeric/math/log10>) a cada elemento do valarray
(template de função)

##### Funções de potência

[ pow(std::valarray)](<#/doc/numeric/valarray/pow>) | aplica a função [std::pow](<#/doc/numeric/math/pow>) a dois valarrays ou a um valarray e um valor
(template de função)
[ sqrt(std::valarray)](<#/doc/numeric/valarray/sqrt>) | aplica a função [std::sqrt](<#/doc/numeric/math/sqrt>) a cada elemento do valarray
(template de função)

##### Funções trigonométricas

[ sin(std::valarray)](<#/doc/numeric/valarray/sin>) | aplica a função [std::sin](<#/doc/numeric/math/sin>) a cada elemento do valarray
(template de função)
[ cos(std::valarray)](<#/doc/numeric/valarray/cos>) | aplica a função [std::cos](<#/doc/numeric/math/cos>) a cada elemento do valarray
(template de função)
[ tan(std::valarray)](<#/doc/numeric/valarray/tan>) | aplica a função [std::tan](<#/doc/numeric/math/tan>) a cada elemento do valarray
(template de função)
[ asin(std::valarray)](<#/doc/numeric/valarray/asin>) | aplica a função [std::asin](<#/doc/numeric/math/asin>) a cada elemento do valarray
(template de função)
[ acos(std::valarray)](<#/doc/numeric/valarray/acos>) | aplica a função [std::acos](<#/doc/numeric/math/acos>) a cada elemento do valarray
(template de função)
[ atan(std::valarray)](<#/doc/numeric/valarray/atan>) | aplica a função [std::atan](<#/doc/numeric/math/atan>) a cada elemento do valarray
(template de função)
[ atan2(std::valarray)](<#/doc/numeric/valarray/atan2>) | aplica a função [std::atan2](<#/doc/numeric/math/atan2>) a um valarray e um valor
(template de função)

##### Funções hiperbólicas

[ sinh(std::valarray)](<#/doc/numeric/valarray/sinh>) | aplica a função [std::sinh](<#/doc/numeric/math/sinh>) a cada elemento do valarray
(template de função)
[ cosh(std::valarray)](<#/doc/numeric/valarray/cosh>) | aplica a função [std::cosh](<#/doc/numeric/math/cosh>) a cada elemento do valarray
(template de função)
[ tanh(std::valarray)](<#/doc/numeric/valarray/tanh>) | aplica a função [std::tanh](<#/doc/numeric/math/tanh>) a cada elemento do valarray
(template de função)

### Classes auxiliares

[ slice](<#/doc/numeric/valarray/slice>) | slice tipo BLAS de um valarray: índice inicial, comprimento, passo
(classe)
[ slice_array](<#/doc/numeric/valarray/slice_array>) | proxy para um subconjunto de um valarray após aplicar um slice
(template de classe)
[ gslice](<#/doc/numeric/valarray/gslice>) | slice generalizado de um valarray: índice inicial, conjunto de comprimentos, conjunto de passos
(classe)
[ gslice_array](<#/doc/numeric/valarray/gslice_array>) | proxy para um subconjunto de um valarray após aplicar um gslice
(template de classe)
[ mask_array](<#/doc/numeric/valarray/mask_array>) | proxy para um subconjunto de um valarray após aplicar uma máscara booleana `operator[]`
(template de classe)
[ indirect_array](<#/doc/numeric/valarray/indirect_array>) | proxy para um subconjunto de um valarray após aplicar `operator[]` indireto
(template de classe)

### [Guias de dedução](<#/doc/numeric/valarray/deduction_guides>)(desde C++17)

### Veja também

[ simd](<#/doc/numeric/simd/basic_simd>)(C++26) | template de alias de conveniência para `basic_simd` que pode especificar sua largura
(template de alias)
[ simd_mask](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/simd/basic_simd_mask&action=edit&redlink=1> "cpp/numeric/simd/basic simd mask \(page does not exist\)")(C++26) | template de alias de conveniência para `basic_simd_mask` que pode especificar sua largura
(template de alias)
[ simd](<#/doc/experimental/simd/simd>)(parallelism TS v2) | tipo de vetor data-parallel
(template de classe)
[ simd_mask](<#/doc/experimental/simd/simd_mask>)(parallelism TS v2) | tipo data-parallel com o tipo de elemento bool
(template de classe)