# Requisitos nomeados C++: RandomNumberDistribution (desde C++11)

Um **RandomNumberDistribution** é um objeto de função que retorna números aleatórios de acordo com uma [função de densidade de probabilidade](<https://en.wikipedia.org/wiki/Probability_density_function> "enwiki:Probability density function") p(x) ou uma [distribuição de probabilidade discreta](<https://en.wikipedia.org/wiki/Discrete_probability_distribution> "enwiki:Discrete probability distribution") P(xi).

### Requisitos

O tipo `D` satisfaz RandomNumberDistribution se

  * `D` satisfaz [CopyConstructible](<#/doc/named_req/CopyConstructible>)
  * `D` satisfaz [CopyAssignable](<#/doc/named_req/CopyAssignable>)

Dado

  * `T`, o tipo nomeado por D::result_type
  * `P`, o tipo nomeado por D::param_type, o qual

    

  * satisfaz [CopyConstructible](<#/doc/named_req/CopyConstructible>)
  * satisfaz [CopyAssignable](<#/doc/named_req/CopyAssignable>)
  * satisfaz [EqualityComparable](<#/doc/named_req/EqualityComparable>)
  * possui um construtor que aceita argumentos idênticos aos de cada um dos construtores de `D` que aceitam argumentos correspondentes aos parâmetros da distribuição.
  * possui uma função membro com o nome, tipo e semântica idênticos aos de cada função membro de `D` que retorna um parâmetro da distribuição
  * declara um typedef membro usando distribution_type = D;

  * `d`, um valor do tipo `D`
  * `x` e `y`, valores (possivelmente const) do tipo `D`
  * `p`, um valor (possivelmente const) do tipo `P`
  * `g`, `g1`, `g2`, lvalues de um tipo que satisfaz [UniformRandomBitGenerator](<#/doc/named_req/UniformRandomBitGenerator>)
  * `os`, lvalue de uma especialização de [std::basic_ostream](<#/doc/io/basic_ostream>)
  * `is`, lvalue de uma especialização de [std::basic_istream](<#/doc/io/basic_istream>)

As seguintes expressões devem ser válidas e ter seus efeitos especificados

```cpp
Expressão | Tipo | Notas | Complexidade
`D::result_type` | `T` | Um tipo aritmético | Tempo de compilação
`D::param_type` | `P` | | Tempo de compilação
`D()` | | Cria uma distribuição indistinguível de qualquer outra `D` construída por padrão | Constante
`D(p)` | | Cria uma distribuição indistinguível de `D` construída diretamente a partir dos valores usados para construir `p` | O mesmo que a construção de `p`
`d.reset()` | `void` | Reinicia o estado interno da distribuição. A próxima chamada a `operator()` em `d` não dependerá de valores produzidos por nenhum engine antes de `reset()` | Constante
`x.param()` | `P` | Retorna `p` tal que D(p).param() == p | Não pior que `D(p)`
`d.param(p)` | `void` | Pós-condição: d.param() == p | Não pior que `D(p)`
`d(g)` | `T` | A sequência de números retornados por invocações sucessivas desta chamada com o mesmo `g` são distribuídos aleatoriamente de acordo com a distribuição parametrizada por `d.param()` | Número constante amortizado de invocações de `g`
`d(g,p)` | `T` | A sequência de números retornados por invocações sucessivas desta chamada com o mesmo `g` são distribuídos aleatoriamente de acordo com a distribuição parametrizada por `p` | Número constante amortizado de invocações de `g`
`x.min()` | `T` | O maior limite inferior para os valores potencialmente retornados pelo `operator()` de `x`, conforme determinado pelos valores atuais dos parâmetros de `x` | Constante
`x.max()` | `T` | O menor limite superior para os valores potencialmente retornados pelo `operator()` de `x`, conforme determinado pelos valores atuais dos parâmetros de `x` | Constante
`x == y` | `bool` | Estabelece uma relação de equivalência. Retorna `true` se x.param() == y.param() e futuras sequências infinitas de valores que seriam geradas por invocações repetidas de x(g1) e y(g2) seriam iguais, desde que g1 == g2 | Constante
`x != y` | `bool` | `!(x == y)` | Constante
`os << x` | Referência para o tipo de `os` | Escreve uma representação textual dos parâmetros da distribuição e do estado interno em `os`. Os flags de formatação e o caractere de preenchimento de `os` permanecem inalterados
`is >> d` | Referência para o tipo de `is` | Restaura os parâmetros da distribuição e o estado interno com dados lidos de `is`. Os flags de formatação de `is` permanecem inalterados. Os dados devem ter sido escritos usando um stream com o mesmo locale, e os mesmos parâmetros de template de stream `CharT` e `Traits`, caso contrário, o comportamento é indefinido. Se uma entrada inválida for encontrada, is.setstate(std::ios::failbit) é chamado, o que pode lançar std::ios_base::failure. `d` permanece inalterado nesse caso
```

### Notas

Os parâmetros de um objeto de distribuição podem ser alterados permanentemente, usando d.param(p), ou apenas pela duração de uma única chamada a operator(), usando d(g,p).

Chamadas a funções membro const da distribuição e os << d não afetam a sequência de números produzida por chamadas repetidas a d(g).

### Biblioteca padrão

Os seguintes componentes da biblioteca padrão satisfazem RandomNumberDistribution

[ uniform_int_distribution](<#/doc/numeric/random/uniform_int_distribution>)(C++11) | produz valores inteiros uniformemente distribuídos em um intervalo
(class template)
[ uniform_real_distribution](<#/doc/numeric/random/uniform_real_distribution>)(C++11) | produz valores reais uniformemente distribuídos em um intervalo
(class template)
[ bernoulli_distribution](<#/doc/numeric/random/bernoulli_distribution>)(C++11) | produz valores bool em uma [distribuição de Bernoulli](<https://en.wikipedia.org/wiki/Bernoulli_distribution> "enwiki:Bernoulli distribution")
(class)
[ binomial_distribution](<#/doc/numeric/random/binomial_distribution>)(C++11) | produz valores inteiros em uma [distribuição binomial](<https://en.wikipedia.org/wiki/Binomial_distribution> "enwiki:Binomial distribution")
(class template)
[ negative_binomial_distribution](<#/doc/numeric/random/negative_binomial_distribution>)(C++11) | produz valores inteiros em uma [distribuição binomial negativa](<https://en.wikipedia.org/wiki/Negative_binomial_distribution> "enwiki:Negative binomial distribution")
(class template)
[ geometric_distribution](<#/doc/numeric/random/geometric_distribution>)(C++11) | produz valores inteiros em uma [distribuição geométrica](<https://en.wikipedia.org/wiki/Geometric_distribution> "enwiki:Geometric distribution")
(class template)
[ poisson_distribution](<#/doc/numeric/random/poisson_distribution>)(C++11) | produz valores inteiros em uma [distribuição de Poisson](<https://en.wikipedia.org/wiki/Poisson_distribution> "enwiki:Poisson distribution")
(class template)
[ exponential_distribution](<#/doc/numeric/random/exponential_distribution>)(C++11) | produz valores reais em uma [distribuição exponencial](<https://en.wikipedia.org/wiki/Exponential_distribution> "enwiki:Exponential distribution")
(class template)
[ gamma_distribution](<#/doc/numeric/random/gamma_distribution>)(C++11) | produz valores reais em uma [distribuição gama](<https://en.wikipedia.org/wiki/Gamma_distribution> "enwiki:Gamma distribution")
(class template)
[ weibull_distribution](<#/doc/numeric/random/weibull_distribution>)(C++11) | produz valores reais em uma [distribuição de Weibull](<https://en.wikipedia.org/wiki/Weibull_distribution> "enwiki:Weibull distribution")
(class template)
[ extreme_value_distribution](<#/doc/numeric/random/extreme_value_distribution>)(C++11) | produz valores reais em uma [distribuição de valor extremo](<https://en.wikipedia.org/wiki/Generalized_extreme_value_distribution> "enwiki:Generalized extreme value distribution")
(class template)
[ normal_distribution](<#/doc/numeric/random/normal_distribution>)(C++11) | produz valores reais em uma [distribuição normal padrão (Gaussiana)](<https://en.wikipedia.org/wiki/Normal_distribution> "enwiki:Normal distribution")
(class template)
[ lognormal_distribution](<#/doc/numeric/random/lognormal_distribution>)(C++11) | produz valores reais em uma [distribuição log-normal](<https://en.wikipedia.org/wiki/Lognormal_distribution> "enwiki:Lognormal distribution")
(class template)
[ chi_squared_distribution](<#/doc/numeric/random/chi_squared_distribution>)(C++11) | produz valores reais em uma [distribuição qui-quadrado](<https://en.wikipedia.org/wiki/Chi-squared_distribution> "enwiki:Chi-squared distribution")
(class template)
[ cauchy_distribution](<#/doc/numeric/random/cauchy_distribution>)(C++11) | produz valores reais em uma [distribuição de Cauchy](<https://en.wikipedia.org/wiki/Cauchy_distribution> "enwiki:Cauchy distribution")
(class template)
[ fisher_f_distribution](<#/doc/numeric/random/fisher_f_distribution>)(C++11) | produz valores reais em uma [distribuição F de Fisher](<https://en.wikipedia.org/wiki/F-distribution> "enwiki:F-distribution")
(class template)
[ student_t_distribution](<#/doc/numeric/random/student_t_distribution>)(C++11) | produz valores reais em uma [distribuição t de Student](<https://en.wikipedia.org/wiki/Student%27s_t-distribution> "enwiki:Student's t-distribution")
(class template)
[ discrete_distribution](<#/doc/numeric/random/discrete_distribution>)(C++11) | produz inteiros aleatórios em uma distribuição discreta
(class template)
[ piecewise_constant_distribution](<#/doc/numeric/random/piecewise_constant_distribution>)(C++11) | produz valores reais distribuídos em subintervalos constantes
(class template)
[ piecewise_linear_distribution](<#/doc/numeric/random/piecewise_linear_distribution>)(C++11) | produz valores reais distribuídos em subintervalos definidos
(class template)
*[_(como está)_]: A::pointer