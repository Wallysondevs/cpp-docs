# std::complex&lt;T&gt;::complex

```cpp
Modelo primário (std::complex<T>)
  // (1)
complex( const T& re = T(), const T& im = T() );  // (até C++14)
constexpr complex( const T& re = T(), const T& im = T() );  // (desde C++14)
  // (2)
complex( const complex& other );  // (até C++14)
constexpr complex( const complex& other );  // (desde C++14)
(até C++23)
constexpr complex( const complex& other ) = default;  // (desde C++23)
  // (3)
template< class X >
complex( const complex<X>& other );  // (até C++14)
template< class X >
constexpr complex( const complex<X>& other );  // (desde C++14)
(até C++23)
template< class X >
constexpr explicit(/* see below */) complex( const complex<X>& other );  // (desde C++23)
Especialização explícita padrão std::complex<float> (até C++23)
  // (1)
complex( float re = 0.0f, float im = 0.0f );  // (até C++11)
constexpr complex( float re = 0.0f, float im = 0.0f );  // (desde C++11)
constexpr complex( const complex<float>& other ) = default;  // (2) (desde C++20)
  // (3)
explicit complex( const complex<double>& other );
explicit complex( const complex<long double>& other );  // (até C++11)
constexpr explicit complex( const complex<double>& other );
constexpr explicit complex( const complex<long double>& other );  // (desde C++11)
Especialização explícita padrão std::complex<double> (até C++23)
  // (1)
complex( double re = 0.0, double im = 0.0 );  // (até C++11)
constexpr complex( double re = 0.0, double im = 0.0 );  // (desde C++11)
constexpr complex( const complex<double>& other ) = default;  // (2) (desde C++20)
  // (3)
complex( const complex<float>& other );
explicit complex( const complex<long double>& other );  // (até C++11)
constexpr complex( const complex<float>& other );
constexpr explicit complex( const complex<long double>& other );  // (desde C++11)
Especialização explícita padrão std::complex<long double> (até C++23)
  // (1)
complex( long double re = 0.0L, long double im = 0.0L );  // (até C++11)
constexpr complex( long double re = 0.0L, long double im = 0.0L );  // (desde C++11)
constexpr complex( const complex<long double>& other ) = default;  // (2) (desde C++20)
  // (3)
complex( const complex<float>& other );
complex( const complex<double>& other );  // (até C++11)
constexpr complex( const complex<float>& other );
constexpr complex( const complex<double>& other );  // (desde C++11)
```

  
Constrói o objeto [std::complex](<#/doc/numeric/complex>). As especializações explícitas padrão ([std::complex](<#/doc/numeric/complex>)&lt;float&gt;, [std::complex](<#/doc/numeric/complex>)&lt;double&gt; e [std::complex](<#/doc/numeric/complex>)&lt;long double&gt;) possuem declarações de construtores diferentes do modelo principal. (até C++23)

1) Constrói o número complexo a partir da parte real re e da parte imaginária im.

2) Construtor de cópia. Constrói o objeto com a cópia do conteúdo de other. Os construtores de cópia são implicitamente declarados nas especializações explícitas padrão. (até C++20)

3) [Construtor de conversão](<#/doc/language/converting_constructor>). Constrói o objeto a partir de um número complexo de um tipo diferente. O modelo principal fornece um modelo de construtor de conversão, enquanto cada especialização explícita padrão fornece dois construtores não-template para as outras duas especializações explícitas padrão. Os construtores não-template são construtores de conversão (ou seja, não-explícitos) se e somente se as conversões das partes real e imaginária não forem de estreitamento (narrowing).  | (até C++23)  
```cpp
Para o modelo principal, a expressão dentro de explicit é avaliada como false se e somente se o rank de conversão de ponto flutuante de `T` for maior ou igual ao rank de conversão de ponto flutuante de `X`.  // (desde C++23)
```
  
### Parâmetros

re  |  \-  |  a parte real   
---|---|---
im  |  \-  |  a parte imaginária   
other  |  \-  |  outro número complexo para usar como fonte   
  
### Notas

Desde C++23, o construtor de cópia é exigido como sendo [trivial](<#/doc/language/copy_constructor>) para satisfazer o requisito [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>), mas as implementações geralmente o tornam trivial em todos os modos. 

### Veja também

[ operator=](<#/>) |  atribui o conteúdo   
(função membro pública)  
[ operator""ifoperator""ioperator""il](<#/doc/numeric/complex/operator_q__q_i>)(C++14) |  um literal [std::complex](<#/doc/numeric/complex>) representando um número puramente imaginário   
(função)  
[Documentação C](<#/>) para CMPLX