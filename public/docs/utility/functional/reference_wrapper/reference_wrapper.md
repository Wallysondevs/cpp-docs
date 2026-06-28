# std::reference_wrapper&lt;T&gt;::reference_wrapper

```cpp
template< class U >
reference_wrapper( U&& x ) noexcept(/*ver abaixo*/) ;  // (1) (desde C++11)
(constexpr desde C++20)
reference_wrapper( const reference_wrapper& other ) noexcept;  // (2) (desde C++11)
(constexpr desde C++20)
```

  
Constrói um novo `reference wrapper`.

1) Converte x para `T&` como se por T& t = [std::forward](<#/doc/utility/forward>)&lt;U&gt;(x);, então armazena uma referência para `t`. Esta sobrecarga participa da resolução de sobrecarga apenas se typename [std::decay](<#/doc/types/decay>)&lt;U&gt;::type não for do mesmo tipo que `reference_wrapper` e a expressão FUN([std::declval](<#/doc/utility/declval>)&lt;U&gt;()) for bem-formada, onde `FUN` nomeia o conjunto de funções imaginárias
```
    void FUN(T&) noexcept;
    void FUN(T&&) = delete;
```

2) Construtor de cópia. Armazena uma referência para other.get().

### Parâmetros

x  |  \-  |  um objeto para encapsular   
---|---|---
other  |  \-  |  outro `reference wrapper`   
  
### Exceções

1)

Especificação [`noexcept`](<#/doc/language/noexcept_spec>): 

noexcept(noexcept(FUN([std::declval](<#/doc/utility/declval>)&lt;U&gt;())))

onde `FUN` é o conjunto de funções imaginárias descrito na descrição acima.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 2993](<https://cplusplus.github.io/LWG/issue2993>) | C++11  | construtor `reference_wrapper(T&&)` deletado interfere  
com a resolução de sobrecarga em alguns casos  | substituído por um `template` de construtor 