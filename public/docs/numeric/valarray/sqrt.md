# std::sqrt(std::valarray)

Definido no header `[<valarray>](<#/doc/header/valarray>)`

```cpp
template< class T >
valarray<T> sqrt( const valarray<T>& va );
```

Para cada elemento em va, calcula a raiz quadrada do valor do elemento.

### Parâmetros

- **va** — array de valores para aplicar a operação

### Valor de retorno

Array de valores contendo as raízes quadradas dos valores em va.

### Observações

A função não qualificada (sqrt) é usada para realizar o cálculo. Se tal função não estiver disponível, [std::sqrt](<#/doc/numeric/math/sqrt>) é usada devido à [pesquisa dependente de argumento](<#/doc/language/adl>).

A função pode ser implementada com um tipo de retorno diferente de [std::valarray](<#/doc/numeric/valarray>). Neste caso, o tipo de substituição possui as seguintes propriedades:

*   Todas as funções membro const de [std::valarray](<#/doc/numeric/valarray>) são fornecidas.
*   [std::valarray](<#/doc/numeric/valarray>), [std::slice_array](<#/doc/numeric/valarray/slice_array>), [std::gslice_array](<#/doc/numeric/valarray/gslice_array>), [std::mask_array](<#/doc/numeric/valarray/mask_array>) e [std::indirect_array](<#/doc/numeric/valarray/indirect_array>) podem ser construídos a partir do tipo de substituição.
*   Para cada função que recebe um const [std::valarray](<#/doc/numeric/valarray>)&lt;T&gt;&, exceto [`begin()`](<#/doc/numeric/valarray/begin2>) e [`end()`](<#/doc/numeric/valarray/end2>)(desde C++11), funções idênticas que recebem os tipos de substituição devem ser adicionadas;
*   Para cada função que recebe dois argumentos const [std::valarray](<#/doc/numeric/valarray>)&lt;T&gt;&, funções idênticas que recebem cada combinação de const [std::valarray](<#/doc/numeric/valarray>)&lt;T&gt;& e tipos de substituição devem ser adicionadas.
*   O tipo de retorno não adiciona mais de dois níveis de aninhamento de template sobre o tipo de argumento mais profundamente aninhado.

### Possível implementação
```cpp
    template<class T>
    valarray<T> sqrt(const valarray<T>& va)
    {
        valarray<T> other = va;
        for (T& i : other)
            i = sqrt(i);
    
        return other; // proxy object may be returned
    }
```

---

### Exemplo

Encontra todas as três raízes (duas das quais podem ser conjugados complexos) de várias [equações cúbicas](<https://en.wikipedia.org/wiki/Cubic_equation> "enwiki:Cubic equation") de uma vez.

Execute este código
```cpp
    #include <cassert>
    #include <complex>
    #include <cstddef>
    #include <iostream>
    #include <numbers>
    #include <valarray>
    
    using CD = std::complex<double>;
    using VA = std::valarray<CD>;
    
    // return all n complex roots out of a given complex number x
    VA root(CD x, unsigned n)
    {
        const double mag = std::pow(std::abs(x), 1.0 / n);
        const double step = 2.0 * std::numbers::pi / n;
        double phase = std::arg(x) / n;
        VA v(n);
        for (std::size_t i{}; i != n; ++i, phase += step)
            v[i] = std::polar(mag, phase);
        return v;
    }
    
    // return n complex roots of each element in v; in the output valarray first
    // goes the sequence of all n roots of v[0], then all n roots of v[1], etc.
    VA root(VA v, unsigned n)
    {
        VA o(v.size() * n);
        VA t(n);
        for (std::size_t i = 0; i != v.size(); ++i)
        {
            t = root(v[i], n);
            for (unsigned j = 0; j != n; ++j)
                o[n * i + j] = t[j];
        }
        return o;
    }
    
    // floating-point numbers comparator that tolerates given rounding error
    inline bool is_equ(CD x, CD y, double tolerance = 0.000'000'001)
    {
        return std::abs(std::abs(x) - std::abs(y)) < tolerance;
    }
    
    int main()
    {
        // input coefficients for polynomial x³ + p·x + q
        const VA p{1, 2, 3, 4, 5, 6, 7, 8};
        const VA q{1, 2, 3, 4, 5, 6, 7, 8};
    
        // the solver
        const VA d = std::sqrt(std::pow(q / 2, 2) + std::pow(p / 3, 3));
        const VA u = root(-q / 2 + d, 3);
        const VA n = root(-q / 2 - d, 3);
    
        // allocate memory for roots: 3 * number of input cubic polynomials
        VA x[3];
        for (std::size_t t = 0; t != 3; ++t)
            x[t].resize(p.size());
    
        auto is_proper_root =  { return is_equ(a * b + p / 3.0, 0.0); };
    
        // sieve out 6 out of 9 generated roots, leaving only 3 proper roots (per polynomial)
        for (std::size_t i = 0; i != p.size(); ++i)
            for (std::size_t j = 0, r = 0; j != 3; ++j)
                for (std::size_t k = 0; k != 3; ++k)
                    if (is_proper_root(u[3 * i + j], n[3 * i + k], p[i]))
                        x[r++][i] = u[3 * i + j] + n[3 * i + k];
    
        std::cout << "Depressed cubic equation:   Root 1: \t\t Root 2: \t\t Root 3:\n";
        for (std::size_t i = 0; i != p.size(); ++i)
        {
            std::cout << "x³ + " << p[i] << "·x + " << q[i] << " = 0  "
                      << std::fixed << x[0][i] << "  " << x[1][i] << "  " << x[2][i]
                      << std::defaultfloat << '\n';
    
            assert(is_equ(std::pow(x[0][i], 3) + x[0][i] * p[i] + q[i], 0.0));
            assert(is_equ(std::pow(x[1][i], 3) + x[1][i] * p[i] + q[i], 0.0));
            assert(is_equ(std::pow(x[2][i], 3) + x[2][i] * p[i] + q[i], 0.0));
        }
    }
```

Saída:
```
    Depressed cubic equation:   Root 1:              Root 2:                 Root 3:
    x³ + (1,0)·x + (1,0) = 0  (-0.682328,0.000000)  (0.341164,1.161541)  (0.341164,-1.161541)
    x³ + (2,0)·x + (2,0) = 0  (-0.770917,0.000000)  (0.385458,1.563885)  (0.385458,-1.563885)
    x³ + (3,0)·x + (3,0) = 0  (-0.817732,0.000000)  (0.408866,1.871233)  (0.408866,-1.871233)
    x³ + (4,0)·x + (4,0) = 0  (-0.847708,0.000000)  (0.423854,2.130483)  (0.423854,-2.130483)
    x³ + (5,0)·x + (5,0) = 0  (-0.868830,0.000000)  (0.434415,2.359269)  (0.434415,-2.359269)
    x³ + (6,0)·x + (6,0) = 0  (-0.884622,0.000000)  (0.442311,2.566499)  (0.442311,-2.566499)
    x³ + (7,0)·x + (7,0) = 0  (-0.896922,0.000000)  (0.448461,2.757418)  (0.448461,-2.757418)
    x³ + (8,0)·x + (8,0) = 0  (-0.906795,0.000000)  (0.453398,2.935423)  (0.453398,-2.935423)
```

### Veja também

[ pow(std::valarray)](<#/doc/numeric/valarray/pow>) | aplica a função [std::pow](<#/doc/numeric/math/pow>) a dois valarrays ou a um valarray e um valor
(modelo de função)
[ sqrtsqrtfsqrtl](<#/doc/numeric/math/sqrt>)(C++11)(C++11) | calcula a raiz quadrada (\\(\small{\sqrt{x}}\\)√x)
(função)
[ sqrt(std::complex)](<#/doc/numeric/complex/sqrt>) | raiz quadrada complexa no intervalo do semiplano direito
(modelo de função)