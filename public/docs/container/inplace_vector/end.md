# std::inplace_vector&lt;T,N&gt;::end, std::inplace_vector&lt;T,N&gt;::cend

```cpp
constexpr iterator end() noexcept;  // (1) (desde C++26)
constexpr const_iterator end() const noexcept;  // (2) (desde C++26)
constexpr const_iterator cend() const noexcept;  // (3) (desde C++26)
```

  
Retorna um iterator para o elemento que segue o último elemento do `inplace_vector`. 

Este elemento atua como um marcador de posição (placeholder); tentar acessá-lo resulta em comportamento indefinido. 

### Parâmetros

(nenhum) 

### Valor de retorno

Iterator para o elemento que segue o último elemento. 

### Complexidade

Constante. 

### Exemplo

[Template:cpp/container/begin/examples/inplace vector](<https://en.cppreference.com/mwiki/index.php?title=Template:cpp/container/begin/examples/inplace_vector&action=edit&redlink=1> "Template:cpp/container/begin/examples/inplace vector \(page does not exist\)")

### Veja também

[ begincbegin](<#/doc/container/inplace_vector/begin>) |  retorna um iterator para o início   
(função membro pública)  
[ endcend](<#/doc/iterator/end>)(C++11)(C++14) |  retorna um iterator para o fim de um container ou array   
(modelo de função)