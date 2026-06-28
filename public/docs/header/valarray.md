# Header da biblioteca padrão &lt;valarray&gt;

Este header faz parte da biblioteca [numeric](<#/doc/numeric>).

### Includes

[ <initializer_list>](<#/doc/header/initializer_list>)(desde C++11) | template de classe [std::initializer_list](<#/doc/utility/initializer_list>)

### Classes

[ valarray](<#/doc/numeric/valarray>) | Arrays numéricos e fatias de array
(template de classe)
[ slice](<#/doc/numeric/valarray/slice>) | Fatia tipo BLAS de um valarray: índice inicial, comprimento, passo
(classe)
[ slice_array](<#/doc/numeric/valarray/slice_array>) | proxy para um subconjunto de um valarray após aplicar um slice
(template de classe)
[ gslice](<#/doc/numeric/valarray/gslice>) | fatia generalizada de um valarray: índice inicial, conjunto de comprimentos, conjunto de passos
(classe)
[ gslice_array](<#/doc/numeric/valarray/gslice_array>) | proxy para um subconjunto de um valarray após aplicar um gslice
(template de classe)
[ mask_array](<#/doc/numeric/valarray/mask_array>) | proxy para um subconjunto de um valarray após aplicar um `operator[]` de máscara booleana
(template de classe)
[ indirect_array](<#/doc/numeric/valarray/indirect_array>) | proxy para um subconjunto de um valarray após aplicar um `operator[]` indireto
(template de classe)

### Funções

##### Operações

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
[ abs(std::valarray)](<#/doc/numeric/valarray/abs>) | aplica a função abs a cada elemento de valarray
(template de função)

##### Funções exponenciais

[ exp(std::valarray)](<#/doc/numeric/valarray/exp>) | aplica a função [std::exp](<#/doc/numeric/math/exp>) a cada elemento de valarray
(template de função)
[ log(std::valarray)](<#/doc/numeric/valarray/log>) | aplica a função [std::log](<#/doc/numeric/math/log>) a cada elemento de valarray
(template de função)
[ log10(std::valarray)](<#/doc/numeric/valarray/log10>) | aplica a função [std::log10](<#/doc/numeric/math/log10>) a cada elemento de valarray
(template de função)

##### Funções de potência

[ pow(std::valarray)](<#/doc/numeric/valarray/pow>) | aplica a função [std::pow](<#/doc/numeric/math/pow>) a dois valarrays ou a um valarray e um valor
(template de função)
[ sqrt(std::valarray)](<#/doc/numeric/valarray/sqrt>) | aplica a função [std::sqrt](<#/doc/numeric/math/sqrt>) a cada elemento de valarray
(template de função)

##### Funções trigonométricas

[ sin(std::valarray)](<#/doc/numeric/valarray/sin>) | aplica a função [std::sin](<#/doc/numeric/math/sin>) a cada elemento de valarray
(template de função)
[ cos(std::valarray)](<#/doc/numeric/valarray/cos>) | aplica a função [std::cos](<#/doc/numeric/math/cos>) a cada elemento de valarray
(template de função)
[ tan(std::valarray)](<#/doc/numeric/valarray/tan>) | aplica a função [std::tan](<#/doc/numeric/math/tan>) a cada elemento de valarray
(template de função)
[ asin(std::valarray)](<#/doc/numeric/valarray/asin>) | aplica a função [std::asin](<#/doc/numeric/math/asin>) a cada elemento de valarray
(template de função)
[ acos(std::valarray)](<#/doc/numeric/valarray/acos>) | aplica a função [std::acos](<#/doc/numeric/math/acos>) a cada elemento de valarray
(template de função)
[ atan(std::valarray)](<#/doc/numeric/valarray/atan>) | aplica a função [std::atan](<#/doc/numeric/math/atan>) a cada elemento de valarray
(template de função)
[ atan2(std::valarray)](<#/doc/numeric/valarray/atan2>) | aplica a função [std::atan2](<#/doc/numeric/math/atan2>) a um valarray e um valor
(template de função)

##### Funções hiperbólicas

[ sinh(std::valarray)](<#/doc/numeric/valarray/sinh>) | aplica a função [std::sinh](<#/doc/numeric/math/sinh>) a cada elemento de valarray
(template de função)
[ cosh(std::valarray)](<#/doc/numeric/valarray/cosh>) | aplica a função [std::cosh](<#/doc/numeric/math/cosh>) a cada elemento de valarray
(template de função)
[ tanh(std::valarray)](<#/doc/numeric/valarray/tanh>) | aplica a função [std::tanh](<#/doc/numeric/math/tanh>) a cada elemento de valarray
(template de função)

### Sinopse
```cpp
    #include <initializer_list>
    
    namespace std {
      template<class T> class valarray;         // An array of type T
      class slice;                              // a BLAS-like slice out of an array
      template<class T> class slice_array;
      class gslice;                             // a generalized slice out of an array
      template<class T> class gslice_array;
      template<class T> class mask_array;       // a masked array
      template<class T> class indirect_array;   // an indirected array
    
      template<class T> void swap(valarray<T>&, valarray<T>&) noexcept;
    
      template<class T> valarray<T> operator* (const valarray<T>&, const valarray<T>&);
      template<class T> valarray<T> operator* (const valarray<T>&,
                                               const typename valarray<T>::value_type&);
      template<class T> valarray<T> operator* (const typename valarray<T>::value_type&,
                                               const valarray<T>&);
    
      template<class T> valarray<T> operator/ (const valarray<T>&, const valarray<T>&);
      template<class T> valarray<T> operator/ (const valarray<T>&,
                                               const typename valarray<T>::value_type&);
      template<class T> valarray<T> operator/ (const typename valarray<T>::value_type&,
                                               const valarray<T>&);
    
      template<class T> valarray<T> operator% (const valarray<T>&, const valarray<T>&);
      template<class T> valarray<T> operator% (const valarray<T>&,
                                               const typename valarray<T>::value_type&);
      template<class T> valarray<T> operator% (const typename valarray<T>::value_type&,
                                               const valarray<T>&);
    
      template<class T> valarray<T> operator+ (const valarray<T>&, const valarray<T>&);
      template<class T> valarray<T> operator+ (const valarray<T>&,
                                               const typename valarray<T>::value_type&);
      template<class T> valarray<T> operator+ (const typename valarray<T>::value_type&,
                                               const valarray<T>&);
    
      template<class T> valarray<T> operator- (const valarray<T>&, const valarray<T>&);
      template<class T> valarray<T> operator- (const valarray<T>&,
                                               const typename valarray<T>::value_type&);
      template<class T> valarray<T> operator- (const typename valarray<T>::value_type&,
                                               const valarray<T>&);
    
      template<class T> valarray<T> operator^ (const valarray<T>&, const valarray<T>&);
      template<class T> valarray<T> operator^ (const valarray<T>&,
                                               const typename valarray<T>::value_type&);
      template<class T> valarray<T> operator^ (const typename valarray<T>::value_type&,
                                               const valarray<T>&);
    
      template<class T> valarray<T> operator& (const valarray<T>&, const valarray<T>&);
      template<class T> valarray<T> operator& (const valarray<T>&,
                                               const typename valarray<T>::value_type&);
      template<class T> valarray<T> operator& (const typename valarray<T>::value_type&,
                                               const valarray<T>&);
    
      template<class T> valarray<T> operator| (const valarray<T>&, const valarray<T>&);
      template<class T> valarray<T> operator| (const valarray<T>&,
                                               const typename valarray<T>::value_type&);
      template<class T> valarray<T> operator| (const typename valarray<T>::value_type&,
                                               const valarray<T>&);
    
      template<class T> valarray<T> operator<<(const valarray<T>&, const valarray<T>&);
      template<class T> valarray<T> operator<<(const valarray<T>&,
                                               const typename valarray<T>::value_type&);
      template<class T> valarray<T> operator<<(const typename valarray<T>::value_type&,
                                               const valarray<T>&);
    
      template<class T> valarray<T> operator>>(const valarray<T>&, const valarray<T>&);
      template<class T> valarray<T> operator>>(const valarray<T>&,
                                               const typename valarray<T>::value_type&);
      template<class T> valarray<T> operator>>(const typename valarray<T>::value_type&,
                                               const valarray<T>&);
    
      template<class T> valarray<bool> operator&&(const valarray<T>&, const valarray<T>&);
      template<class T> valarray<bool> operator&&(const valarray<T>&,
                                                  const typename valarray<T>::value_type&);
      template<class T> valarray<bool> operator&&(const typename valarray<T>::value_type&,
                                                  const valarray<T>&);
    
      template<class T> valarray<bool> operator||(const valarray<T>&, const valarray<T>&);
      template<class T> valarray<bool> operator||(const valarray<T>&,
                                                  const typename valarray<T>::value_type&);
      template<class T> valarray<bool> operator||(const typename valarray<T>::value_type&,
                                                  const valarray<T>&);
    
      template<class T> valarray<bool> operator==(const valarray<T>&, const valarray<T>&);
      template<class T> valarray<bool> operator==(const valarray<T>&,
                                                  const typename valarray<T>::value_type&);
      template<class T> valarray<bool> operator==(const typename valarray<T>::value_type&,
                                                  const valarray<T>&);
      template<class T> valarray<bool> operator!=(const valarray<T>&, const valarray<T>&);
      template<class T> valarray<bool> operator!=(const valarray<T>&,
                                                  const typename valarray<T>::value_type&);
      template<class T> valarray<bool> operator!=(const typename valarray<T>::value_type&,
                                                  const valarray<T>&);
    
      template<class T> valarray<bool> operator< (const valarray<T>&, const valarray<T>&);
      template<class T> valarray<bool> operator< (const valarray<T>&,
                                                  const typename valarray<T>::value_type&);
      template<class T> valarray<bool> operator< (const typename valarray<T>::value_type&,
                                                  const valarray<T>&);
      template<class T> valarray<bool> operator> (const valarray<T>&, const valarray<T>&);
      template<class T> valarray<bool> operator> (const valarray<T>&,
                                                  const typename valarray<T>::value_type&);
      template<class T> valarray<bool> operator> (const typename valarray<T>::value_type&,
                                                  const valarray<T>&);
      template<class T> valarray<bool> operator<=(const valarray<T>&, const valarray<T>&);
      template<class T> valarray<bool> operator<=(const valarray<T>&,
                                                  const typename valarray<T>::value_type&);
      template<class T> valarray<bool> operator<=(const typename valarray<T>::value_type&,
                                                  const valarray<T>&);
      template<class T> valarray<bool> operator>=(const valarray<T>&, const valarray<T>&);
      template<class T> valarray<bool> operator>=(const valarray<T>&,
                                                  const typename valarray<T>::value_type&);
      template<class T> valarray<bool> operator>=(const typename valarray<T>::value_type&,
                                                  const valarray<T>&);
    
      template<class T> valarray<T> abs  (const valarray<T>&);
      template<class T> valarray<T> acos (const valarray<T>&);
      template<class T> valarray<T> asin (const valarray<T>&);
      template<class T> valarray<T> atan (const valarray<T>&);
    
      template<class T> valarray<T> atan2(const valarray<T>&, const valarray<T>&);
      template<class T> valarray<T> atan2(const valarray<T>&,
                                          const typename valarray<T>::value_type&);
      template<class T> valarray<T> atan2(const typename valarray<T>::value_type&,
                                          const valarray<T>&);
    
      template<class T> valarray<T> cos  (const valarray<T>&);
      template<class T> valarray<T> cosh (const valarray<T>&);
      template<class T> valarray<T> exp  (const valarray<T>&);
      template<class T> valarray<T> log  (const valarray<T>&);
      template<class T> valarray<T> log10(const valarray<T>&);
    
      template<class T> valarray<T> pow(const valarray<T>&, const valarray<T>&);
      template<class T> valarray<T> pow(const valarray<T>&,
                                        const typename valarray<T>::value_type&);
      template<class T> valarray<T> pow(const typename valarray<T>::value_type&,
                                        const valarray<T>&);
    
      template<class T> valarray<T> sin  (const valarray<T>&);
      template<class T> valarray<T> sinh (const valarray<T>&);
      template<class T> valarray<T> sqrt (const valarray<T>&);
      template<class T> valarray<T> tan  (const valarray<T>&);
      template<class T> valarray<T> tanh (const valarray<T>&);
    
      template<class T> /* unspecified1 */ begin(valarray<T>& v);
      template<class T> /* unspecified2 */ begin(const valarray<T>& v);
      template<class T> /* unspecified1 */ end(valarray<T>& v);
      template<class T> /* unspecified2 */ end(const valarray<T>& v);
    }
```

### Template de classe [std::valarray](<#/doc/numeric/valarray>)
```cpp
    namespace std {
      template<class T> class valarray {
      public:
        using value_type = T;
    
        // construct/destroy
        valarray();
        explicit valarray(size_t);
        valarray(const T&, size_t);
        valarray(const T*, size_t);
        valarray(const valarray&);
        valarray(valarray&&) noexcept;
        valarray(const slice_array<T>&);
        valarray(const gslice_array<T>&);
        valarray(const mask_array<T>&);
        valarray(const indirect_array<T>&);
        valarray(initializer_list<T>);
        ~valarray();
    
        // assignment
        valarray& operator=(const valarray&);
        valarray& operator=(valarray&&) noexcept;
        valarray& operator=(initializer_list<T>);
        valarray& operator=(const T&);
        valarray& operator=(const slice_array<T>&);
        valarray& operator=(const gslice_array<T>&);
        valarray& operator=(const mask_array<T>&);
        valarray& operator=(const indirect_array<T>&);
    
        // element access
        const T&          operator const;
        T&                operator;
    
        // subset operations
        valarray          operator const;
        slice_array<T>    operator;
        valarray          operator const;
        gslice_array<T>   operator;
        valarray          operator const;
        mask_array<T>     operator;
        valarray          operator const;
        indirect_array<T> operator;
    
        // unary operators
        valarray operator+() const;
        valarray operator-() const;
        valarray operator~() const;
        valarray<bool> operator!() const;
    
        // compound assignment
        valarray& operator*= (const T&);
        valarray& operator/= (const T&);
        valarray& operator%= (const T&);
        valarray& operator+= (const T&);
        valarray& operator-= (const T&);
        valarray& operator^= (const T&);
        valarray& operator&= (const T&);
        valarray& operator|= (const T&);
        valarray& operator<<=(const T&);
        valarray& operator>>=(const T&);
    
        valarray& operator*= (const valarray&);
        valarray& operator/= (const valarray&);
        valarray& operator%= (const valarray&);
        valarray& operator+= (const valarray&);
        valarray& operator-= (const valarray&);
        valarray& operator^= (const valarray&);
        valarray& operator|= (const valarray&);
        valarray& operator&= (const valarray&);
        valarray& operator<<=(const valarray&);
        valarray& operator>>=(const valarray&);
    
        // member functions
        void swap(valarray&) noexcept;
    
        size_t size() const;
    
        T sum() const;
        T min() const;
        T max() const;
    
        valarray shift (int) const;
        valarray cshift(int) const;
        valarray apply(T func(T)) const;
        valarray apply(T func(const T&)) const;
        void resize(size_t sz, T c = T());
      };
    
      template<class T, size_t cnt> valarray(const T(&)[cnt], size_t) -> valarray<T>;
    }
```

### Classe [std::slice](<#/doc/numeric/valarray/slice>)
```cpp
    namespace std {
      class slice {
      public:
        slice();
        slice(size_t, size_t, size_t);
    
        size_t start() const;
        size_t size() const;
        size_t stride() const;
    
        friend bool operator==(const slice& x, const slice& y);
      };
    }
```

### Template de classe [std::slice_array](<#/doc/numeric/valarray/slice_array>)
```cpp
    namespace std {
      template<class T> class slice_array {
      public:
        using value_type = T;
    
        void operator=  (const valarray<T>&) const;
        void operator*= (const valarray<T>&) const;
        void operator/= (const valarray<T>&) const;
        void operator%= (const valarray<T>&) const;
        void operator+= (const valarray<T>&) const;
        void operator-= (const valarray<T>&) const;
        void operator^= (const valarray<T>&) const;
        void operator&= (const valarray<T>&) const;
        void operator|= (const valarray<T>&) const;
        void operator<<=(const valarray<T>&) const;
        void operator>>=(const valarray<T>&) const;
    
        slice_array(const slice_array&);
        ~slice_array();
        const slice_array& operator=(const slice_array&) const;
        void operator=(const T&) const;
    
        slice_array() = delete;     // as implied by declaring copy constructor above
      };
    }
```

### Classe [std::gslice](<#/doc/numeric/valarray/gslice>)
```cpp
    namespace std {
      class gslice {
      public:
        gslice();
        gslice(size_t s, const valarray<size_t>& l, const valarray<size_t>& d);
    
        size_t           start() const;
        valarray<size_t> size() const;
        valarray<size_t> stride() const;
      };
    }
```

### Template de classe [std::gslice_array](<#/doc/numeric/valarray/gslice_array>)
```cpp
    namespace std {
      template<class T> class gslice_array {
      public:
        using value_type = T;
    
        void operator=  (const valarray<T>&) const;
        void operator*= (const valarray<T>&) const;
        void operator/= (const valarray<T>&) const;
        void operator%= (const valarray<T>&) const;
        void operator+= (const valarray<T>&) const;
        void operator-= (const valarray<T>&) const;
        void operator^= (const valarray<T>&) const;
        void operator&= (const valarray<T>&) const;
        void operator|= (const valarray<T>&) const;
        void operator<<=(const valarray<T>&) const;
        void operator>>=(const valarray<T>&) const;
    
        gslice_array(const gslice_array&);
        ~gslice_array();
        const gslice_array& operator=(const gslice_array&) const;
        void operator=(const T&) const;
    
        gslice_array() = delete;    // as implied by declaring copy constructor above
      };
    }
```

### Template de classe [std::mask_array](<#/doc/numeric/valarray/mask_array>)
```cpp
    namespace std {
      template<class T> class mask_array {
      public:
        using value_type = T;
    
        void operator=  (const valarray<T>&) const;
        void operator*= (const valarray<T>&) const;
        void operator/= (const valarray<T>&) const;
        void operator%= (const valarray<T>&) const;
        void operator+= (const valarray<T>&) const;
        void operator-= (const valarray<T>&) const;
        void operator^= (const valarray<T>&) const;
        void operator&= (const valarray<T>&) const;
        void operator|= (const valarray<T>&) const;
        void operator<<=(const valarray<T>&) const;
        void operator>>=(const valarray<T>&) const;
    
        mask_array(const mask_array&);
        ~mask_array();
        const mask_array& operator=(const mask_array&) const;
        void operator=(const T&) const;
    
        mask_array() = delete;      // as implied by declaring copy constructor above
      };
    }
```

### Template de classe [std::indirect_array](<#/doc/numeric/valarray/indirect_array>)
```cpp
    namespace std {
      template<class T> class indirect_array {
      public:
        using value_type = T;
    
        void operator=  (const valarray<T>&) const;
        void operator*= (const valarray<T>&) const;
        void operator/= (const valarray<T>&) const;
        void operator%= (const valarray<T>&) const;
        void operator+= (const valarray<T>&) const;
        void operator-= (const valarray<T>&) const;
        void operator^= (const valarray<T>&) const;
        void operator&= (const valarray<T>&) const;
        void operator|= (const valarray<T>&) const;
        void operator<<=(const valarray<T>&) const;
        void operator>>=(const valarray<T>&) const;
    
        indirect_array(const indirect_array&);
        ~indirect_array();
        const indirect_array& operator=(const indirect_array&) const;
        void operator=(const T&) const;
    
        indirect_array() = delete;  // as implied by declaring copy constructor above
      };
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 125](<https://cplusplus.github.io/LWG/issue125>) | C++98 | o tipo de retorno de [`valarray<T>::operator!()`](<#/doc/numeric/valarray/operator_arith>)
era valarray&lt;T&gt; na sinopse | corrigido para valarray&lt;bool&gt;