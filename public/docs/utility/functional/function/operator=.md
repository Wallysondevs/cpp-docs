# std::function&lt;R(Args...)&gt;::operator=

```cpp
function& operator=( const function& other );  // (1) (desde C++11)
function& operator=( function&& other );  // (2) (desde C++11)
function& operator=( std::nullptr_t ) noexcept;  // (3) (desde C++11)
template< class F >
function& operator=( F&& f );  // (4) (desde C++11)
template< class F >
function& operator=( std::reference_wrapper<F> f ) noexcept;  // (5) (desde C++11)
```

  
Atribui um novo _alvo_ a `std::function`.

1) Atribui uma cópia do _alvo_ de other, como se executasse function(other).swap(*this);

2) Move o _alvo_ de other para *this. other fica em um estado válido com um valor não especificado.

3) Descarta o _alvo_ atual. *this fica _vazio_ após a chamada.

4) Define o _alvo_ de *this para o callable f, como se executasse function([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f)).swap(*this);. Este operador não participa da resolução de sobrecarga a menos que f seja [Callable](<#/doc/named_req/Callable>) para os tipos de argumento `Args...` e tipo de retorno `R`.

5) Define o _alvo_ de *this para uma cópia de f, como se executasse function(f).swap(*this);

### Parâmetros

other  |  \-  |  outro objeto `std::function` para copiar o alvo de   
---|---|---
f  |  \-  |  um callable para inicializar o _alvo_ com   
Requisitos de tipo   
-`F` deve atender aos requisitos de [Callable](<#/doc/named_req/Callable>).   
  
### Valor de retorno

*this

### Notas

Mesmo antes do suporte a alocadores ser removido de `std::function` em C++17, esses operadores de atribuição usam o alocador padrão em vez do alocador de *this ou do alocador de other (veja [LWG issue 2386](<https://cplusplus.github.io/LWG/issue2386>)).

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <functional>
    #include <utility>
     
    int inc(int n) { return n + 1; }
     
    int main()
    {
        std::function<int(int)> f1;
        std::function<int(int)> f2(inc);
        assert(f1 == nullptr and f2 != nullptr);
     
        f1 = f2; // overload (1)
        assert(f1 != nullptr and f1(1) == 2);
     
        f1 = std::move(f2); // overload (2)
        assert(f1 != nullptr and f1(1) == 2);
        // f2 is in valid but unspecified state
     
        f1 = nullptr; // overload (3)
        assert(f1 == nullptr);
     
        f1 = inc; // overload (4)
        assert(f1 != nullptr and f1(1) == 2);
     
        f1 =  { return n + n; }; // overload (4)
        assert(f1 != nullptr and f1(2) == 4);
     
        std::reference_wrapper<int(int)> ref1 = std::ref(inc);
        f1 = ref1; // overload (5)
        assert(f1 != nullptr and f1(1) == 2);
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2132](<https://cplusplus.github.io/LWG/issue2132>) | C++11  | a sobrecarga ([4](<#/>)) que recebe um objeto Callable pode ser ambígua  | restrita   
[LWG 2401](<https://cplusplus.github.io/LWG/issue2401>) | C++11  | operador de atribuição ([3](<#/>)) de `std::nullptr_t` não exigido como noexcept  | exigido   
  
### Veja também

[ operator=](<#/>) |  substitui ou destrói o alvo   
(função membro pública de `std::move_only_function`)  
[ assign](<#/doc/utility/functional/function/assign>)(removido em C++17) |  atribui um novo alvo   
(função membro pública)  
---