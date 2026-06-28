# std::vector&lt;T,Allocator&gt;::data

T* data(); | (1) | (noexcept desde C++11)
(constexpr desde C++20)
const T* data() const; | (2) | (noexcept desde C++11)
(constexpr desde C++20)

Retorna um ponteiro para o array subjacente que serve como armazenamento de elementos. O ponteiro é tal que o range `[`data()`, `data() +` `[size()](<#/doc/container/vector/size>)`)` é sempre um [range válido](<#/doc/iterator>), mesmo que o container esteja vazio (`data()` não é desreferenciável nesse caso).

### Parâmetros

(nenhum)

### Valor de retorno

Ponteiro para o armazenamento de elementos subjacente. Para containers não vazios, o ponteiro retornado compara-se como igual ao endereço do primeiro elemento.

### Complexidade

Constante.

### Notas

Se [size()](<#/doc/container/vector/size>) for ​0​, `data()` pode ou não retornar um ponteiro nulo.

### Exemplo

Execute este código
```
    #include <cstddef>
    #include <iostream>
    #include <span>
    #include <vector>
     
    void pointer_func(const int* p, std::size_t size)
    {
        std::cout << "data = ";
        for (std::size_t i = 0; i < size; ++i)
            std::cout << p[i] << ' ';
        std::cout << '\n';
    }
     
    void span_func(std::span<const int> data) // desde C++20
    {
        std::cout << "data = ";
        for (const int e : data)
            std::cout << e << ' ';
        std::cout << '\n';
    }
     
    int main()
    {
        std::vector<int> container{1, 2, 3, 4};
     
        // Prefira container.data() em vez de &container[0]
        pointer_func(container.data(), container.size());
     
        // std::span é uma alternativa mais segura para ponteiro/tamanho separados.
        span_func({container.data(), container.size()});
    }
```

Saída:
```
    data = 1 2 3 4
    data = 1 2 3 4
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 464](<https://cplusplus.github.io/LWG/issue464>) | C++98 | `vector` não tinha esta função membro | adicionado
[LWG 1312](<https://cplusplus.github.io/LWG/issue1312>) | C++98 | o tipo de retorno era `pointer` e `const_pointer` | alterado para T* e const T* respectivamente

### Veja também

[ front](<#/doc/container/vector/front>) | acessa o primeiro elemento
(função membro pública)
[ back](<#/doc/container/vector/back>) | acessa o último elemento
(função membro pública)
[ size](<#/doc/container/vector/size>) | retorna o número de elementos
(função membro pública)
[ operator[]](<#/doc/container/vector/operator_at>) | acessa o elemento especificado
(função membro pública)
[ span](<#/doc/container/span>)(C++20) | uma view não proprietária sobre uma sequência contígua de objetos
(modelo de classe)
[ data](<#/doc/iterator/data>)(C++17) | obtém o ponteiro para o array subjacente
(modelo de função)