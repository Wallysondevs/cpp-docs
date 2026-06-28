# std::inplace_vector&lt;T,N&gt;::begin, std::inplace_vector&lt;T,N&gt;::cbegin

```cpp
constexpr iterator begin() noexcept;  // (1) (desde C++26)
constexpr const_iterator begin() const noexcept;  // (2) (desde C++26)
constexpr const_iterator cbegin() const noexcept;  // (3) (desde C++26)
```

Retorna um iterator para o primeiro elemento do `inplace_vector`.

Se o `inplace_vector` estiver vazio, o iterator retornado será igual a end().

### Parâmetros

(nenhum)

### Valor de retorno

Iterator para o primeiro elemento.

### Complexidade

Constante.

### Exemplo

[Template:cpp/container/begin/examples/inplace vector](<https://en.cppreference.com/mwiki/index.php?title=Template:cpp/container/begin/examples/inplace_vector&action=edit&redlink=1> "Template:cpp/container/begin/examples/inplace vector (página não existe)")

### Veja também

[ endcend](<#/doc/container/inplace_vector/end>) | retorna um iterator para o fim
(função membro pública)
[ begincbegin](<#/doc/iterator/begin>)(C++11)(C++14) | retorna um iterator para o início de um container ou array
(modelo de função)