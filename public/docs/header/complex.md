# Cabeçalho da biblioteca padrão &lt;complex&gt;

Este cabeçalho faz parte da biblioteca [numérica](<#/doc/numeric>).

### Classes

[ complex](<#/doc/numeric/complex>) | um tipo de número complexo
(modelo de classe)

### Funções

##### Operações

---
[ operator+operator-](<#/doc/numeric/complex/operator_arith2>) | aplica operadores unários a números complexos
(modelo de função)
[ operator+operator-operator*operator/](<#/doc/numeric/complex/operator_arith3>) | realiza aritmética de números complexos em dois valores complexos ou um complexo e um escalar
(modelo de função)
[ operator==operator!=](<#/doc/numeric/complex/operator_cmp>)(removido em C++20) | compara dois números complexos ou um complexo e um escalar
(modelo de função)
[ operator<&lt;operator&gt;>](<#/doc/numeric/complex/operator_ltltgtgt>) | serializa e desserializa um número complexo
(modelo de função)
[ real](<#/doc/numeric/complex/real2>) | retorna a parte real
(modelo de função)
[ imag](<#/doc/numeric/complex/imag2>) | retorna a parte imaginária
(modelo de função)
[ abs(std::complex)](<#/doc/numeric/complex/abs>) | retorna a magnitude de um número complexo
(modelo de função)
[ arg](<#/doc/numeric/complex/arg>) | retorna o ângulo de fase
(modelo de função)
[ norm](<#/doc/numeric/complex/norm>) | retorna a magnitude ao quadrado
(modelo de função)
[ conj](<#/doc/numeric/complex/conj>) | retorna o conjugado complexo
(modelo de função)
[ proj](<#/doc/numeric/complex/proj>)(C++11) | retorna a projeção na esfera de Riemann
(modelo de função)
[ polar](<#/doc/numeric/complex/polar>) | constrói um número complexo a partir da magnitude e do ângulo de fase
(modelo de função)

##### Funções exponenciais

[ exp(std::complex)](<#/doc/numeric/complex/exp>) | exponencial complexa de base _e_
(modelo de função)
[ log(std::complex)](<#/doc/numeric/complex/log>) | logaritmo natural complexo com os cortes de ramo ao longo do eixo real negativo
(modelo de função)
[ log10(std::complex)](<#/doc/numeric/complex/log10>) | logaritmo comum complexo com os cortes de ramo ao longo do eixo real negativo
(modelo de função)

##### Funções de potência

[ pow(std::complex)](<#/doc/numeric/complex/pow>) | potência complexa, um ou ambos os argumentos podem ser um número complexo
(modelo de função)
[ sqrt(std::complex)](<#/doc/numeric/complex/sqrt>) | raiz quadrada complexa no intervalo do semiplano direito
(modelo de função)

##### Funções trigonométricas

[ sin(std::complex)](<#/doc/numeric/complex/sin>) | calcula o seno de um número complexo (\\({\small\sin{z}}\\)sin(z))
(modelo de função)
[ cos(std::complex)](<#/doc/numeric/complex/cos>) | calcula o cosseno de um número complexo (\\({\small\cos{z}}\\)cos(z))
(modelo de função)
[ tan(std::complex)](<#/doc/numeric/complex/tan>) | calcula a tangente de um número complexo (\\({\small\tan{z}}\\)tan(z))
(modelo de função)
[ asin(std::complex)](<#/doc/numeric/complex/asin>)(C++11) | calcula o arco seno de um número complexo (\\({\small\arcsin{z}}\\)arcsin(z))
(modelo de função)
[ acos(std::complex)](<#/doc/numeric/complex/acos>)(C++11) | calcula o arco cosseno de um número complexo (\\({\small\arccos{z}}\\)arccos(z))
(modelo de função)
[ atan(std::complex)](<#/doc/numeric/complex/atan>)(C++11) | calcula o arco tangente de um número complexo (\\({\small\arctan{z}}\\)arctan(z))
(modelo de função)

##### Funções hiperbólicas

[ sinh(std::complex)](<#/doc/numeric/complex/sinh>) | calcula o seno hiperbólico de um número complexo (\\({\small\sinh{z}}\\)sinh(z))
(modelo de função)
[ cosh(std::complex)](<#/doc/numeric/complex/cosh>) | calcula o cosseno hiperbólico de um número complexo (\\({\small\cosh{z}}\\)cosh(z))
(modelo de função)
[ tanh(std::complex)](<#/doc/numeric/complex/tanh>) | calcula a tangente hiperbólica de um número complexo (\\({\small\tanh{z}}\\)tanh(z))
(modelo de função)
[ asinh(std::complex)](<#/doc/numeric/complex/asinh>)(C++11) | calcula o seno hiperbólico inverso de um número complexo (\\({\small\operatorname{arsinh}{z}}\\)arsinh(z))
(modelo de função)
[ acosh(std::complex)](<#/doc/numeric/complex/acosh>)(C++11) | calcula o cosseno hiperbólico inverso de um número complexo (\\({\small\operatorname{arcosh}{z}}\\)arcosh(z))
(modelo de função)
[ atanh(std::complex)](<#/doc/numeric/complex/atanh>)(C++11) | calcula a tangente hiperbólica inversa de um número complexo (\\({\small\operatorname{artanh}{z}}\\)artanh(z))
(modelo de função)

##### Literais

[ operator""ifoperator""ioperator""il](<#/doc/numeric/complex/operator_q__q_i>)(C++14) | um literal [std::complex](<#/doc/numeric/complex>) representando um número puramente imaginário
(função)

### Sinopse
```cpp
    namespace std {
        template<class T> class complex;
    
        template<> class complex<float>;
        template<> class complex<double>;
        template<> class complex<long double>;
    
        // operators:
        template<class T> constexpr complex<T> operator+(
            const complex<T>&, const complex<T>&);
        template<class T> constexpr complex<T> operator+(const complex<T>&, const T&);
        template<class T> constexpr complex<T> operator+(const T&, const complex<T>&);
    
        template<class T> constexpr complex<T> operator-(
            const complex<T>&, const complex<T>&);
        template<class T> constexpr complex<T> operator-(const complex<T>&, const T&);
        template<class T> constexpr complex<T> operator-(const T&, const complex<T>&);
    
        template<class T> constexpr complex<T> operator*(
            const complex<T>&, const complex<T>&);
        template<class T> constexpr complex<T> operator*(const complex<T>&, const T&);
        template<class T> constexpr complex<T> operator*(const T&, const complex<T>&);
    
        template<class T> constexpr complex<T> operator/(
            const complex<T>&, const complex<T>&);
        template<class T> constexpr complex<T> operator/(const complex<T>&, const T&);
        template<class T> constexpr complex<T> operator/(const T&, const complex<T>&);
    
        template<class T> constexpr complex<T> operator+(const complex<T>&);
        template<class T> constexpr complex<T> operator-(const complex<T>&);
    
        template<class T> constexpr bool operator==(const complex<T>&, const complex<T>&);
        template<class T> constexpr bool operator==(const complex<T>&, const T&);
        template<class T> constexpr bool operator==(const T&, const complex<T>&);
    
        template<class T> constexpr bool operator!=(const complex<T>&, const complex<T>&);
        template<class T> constexpr bool operator!=(const complex<T>&, const T&);
        template<class T> constexpr bool operator!=(const T&, const complex<T>&);
    
        template<class T, class CharT, class Traits>
        basic_istream<CharT, Traits>&
        operator>>(basic_istream<CharT, Traits>&, complex<T>&);
    
        template<class T, class CharT, class Traits>
        basic_ostream<CharT, Traits>&
        operator<<(basic_ostream<CharT, Traits>&, const complex<T>&);
    
        // values:
        template<class T> constexpr T real(const complex<T>&);
        template<class T> constexpr T imag(const complex<T>&);
    
        template<class T> T abs(const complex<T>&);
        template<class T> T arg(const complex<T>&);
        template<class T> constexpr T norm(const complex<T>&);
    
        template<class T> constexpr complex<T> conj(const complex<T>&);
        template<class T> complex<T> proj(const complex<T>&);
        template<class T> complex<T> polar(const T&, const T& = 0);
    
        // transcendentals:
        template<class T> complex<T> acos(const complex<T>&);
        template<class T> complex<T> asin(const complex<T>&);
        template<class T> complex<T> atan(const complex<T>&);
    
        template<class T> complex<T> acosh(const complex<T>&);
        template<class T> complex<T> asinh(const complex<T>&);
        template<class T> complex<T> atanh(const complex<T>&);
    
        template<class T> complex<T> cos  (const complex<T>&);
        template<class T> complex<T> cosh (const complex<T>&);
        template<class T> complex<T> exp  (const complex<T>&);
        template<class T> complex<T> log  (const complex<T>&);
        template<class T> complex<T> log10(const complex<T>&);
    
        template<class T> complex<T> pow(const complex<T>&, const T&);
        template<class T> complex<T> pow(const complex<T>&, const complex<T>&);
        template<class T> complex<T> pow(const T&, const complex<T>&);
    
        template<class T> complex<T> sin (const complex<T>&);
        template<class T> complex<T> sinh(const complex<T>&);
        template<class T> complex<T> sqrt(const complex<T>&);
        template<class T> complex<T> tan (const complex<T>&);
        template<class T> complex<T> tanh(const complex<T>&);
    
        // tuple interface:
        template<class T> struct tuple_size;
        template<size_t I, class T> struct tuple_element;
        template<class T> struct tuple_size<complex<T>>;
        template<size_t I, class T> struct tuple_element<I, complex<T>>;
        template<size_t I, class T>
          constexpr T& get(complex<T>&) noexcept;
        template<size_t I, class T>
          constexpr T&& get(complex<T>&&) noexcept;
        template<size_t I, class T>
          constexpr const T& get(const complex<T>&) noexcept;
        template<size_t I, class T>
          constexpr const T&& get(const complex<T>&&) noexcept;
    
        // complex literals:
        inline namespace literals {
            inline namespace complex_literals {
                constexpr complex<long double> operator""il(long double);
                constexpr complex<long double> operator""il(unsigned long long);
                constexpr complex<double> operator""i(long double);
                constexpr complex<double> operator""i(unsigned long long);
                constexpr complex<float> operator""if(long double);
                constexpr complex<float> operator""if(unsigned long long);
            }
        }
    }
```

#### Classe [std::complex](<#/doc/numeric/complex>)
```cpp
    template<class T>
    class complex {
    public:
        typedef T value_type;
        constexpr complex(const T& re = T(), const T& im = T());
        constexpr complex(const complex&) = default;
        template<class X> constexpr explicit(/* see constructor page */)
            complex(const complex<X>&);
    
        constexpr T real() const;
        constexpr void real(T);
        constexpr T imag() const;
        constexpr void imag(T);
    
        constexpr complex<T>& operator= (const T&);
        constexpr complex<T>& operator+=(const T&);
        constexpr complex<T>& operator-=(const T&);
        constexpr complex<T>& operator*=(const T&);
        constexpr complex<T>& operator/=(const T&);
    
        constexpr complex& operator=(const complex&);
        template<class X> constexpr complex<T>& operator= (const complex<X>&);
        template<class X> constexpr complex<T>& operator+=(const complex<X>&);
        template<class X> constexpr complex<T>& operator-=(const complex<X>&);
        template<class X> constexpr complex<T>& operator*=(const complex<X>&);
        template<class X> constexpr complex<T>& operator/=(const complex<X>&);
    };
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 79](<https://cplusplus.github.io/LWG/issue79>) | C++98 | o argumento padrão do segundo parâmetro de [`polar`](<#/doc/numeric/complex/polar>) estava faltando na sinopse | adicionado