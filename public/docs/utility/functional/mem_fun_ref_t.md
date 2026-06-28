# std::mem_fun_ref_t, std::mem_fun1_ref_t, std::const_mem_fun_ref_t, std::const_mem_fun1_ref_t

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class S, class T >
class mem_fun_ref_t : public unary_function<T,S> {
public:
explicit mem_fun_ref_t(S (T::*p)());
S operator()(T& p) const;
};
(removido em C++17)
template< class S, class T >
class const_mem_fun_ref_t : public unary_function<T,S> {
public:
explicit const_mem_fun_ref_t(S (T::*p)() const);
S operator()(const T& p) const;
};
(removido em C++17)
template< class S, class T, class A >
class mem_fun1_ref_t : public binary_function<T,A,S> {
public:
explicit mem_fun1_ref_t(S (T::*p)(A));
S operator()(T& p, A x) const;
};
(removido em C++17)
template< class S, class T, class A >
class const_mem_fun1_ref_t : public binary_function<T,A,S> {
public:
explicit const_mem_fun1_ref_t(S (T::*p)(A) const);
S operator()(const T& p, A x) const;
};
(removido em C++17)
```

Invólucro para um ponteiro para função membro. A instância da classe cuja função membro a ser chamada é passada como uma referência para o `operator()`.

1) Invólucro para uma função membro não-const sem parâmetros.

2) Invólucro para uma função membro const sem parâmetros.

3) Invólucro para uma função membro não-const com um único parâmetro.

4) Invólucro para uma função membro const com um único parâmetro.

### Veja também

[ mem_fun_ref](<#/doc/utility/functional/mem_fun_ref>)(obsoleto desde C++11)(removido em C++17) | cria um invólucro a partir de um ponteiro para função membro, chamável com uma referência para objeto
(modelo de função)
[ mem_fun_tmem_fun1_tconst_mem_fun_tconst_mem_fun1_t](<#/doc/utility/functional/mem_fun_t>)(obsoleto desde C++11)(removido em C++17) | invólucro para um ponteiro para função membro nula ou unária, chamável com um ponteiro para objeto
(modelo de classe)