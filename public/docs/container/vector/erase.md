# std::vector&lt;T,Allocator&gt;::erase

```cpp
  // (1)
iterator erase( iterator pos );  // (até C++11)
iterator erase( const_iterator pos );  // (desde C++11)
(constexpr desde C++20)
  // (2)
iterator erase( iterator first, iterator last );  // (até C++11)
iterator erase( const_iterator first, const_iterator last );  // (desde C++11)
(constexpr desde C++20)
```

  
Apaga os elementos especificados do container. 

1) Remove o elemento em pos.

2) Remove os elementos no range `[`first`, `last`)`.

Iterators (incluindo o iterator [`end()`](<#/doc/container/vector/end>)) e referências aos elementos no ponto ou após o ponto da remoção são invalidados. 

O iterator pos deve ser válido e desreferenciável. Assim, o iterator [end()](<#/doc/container/vector/end>) (que é válido, mas não é desreferenciável) não pode ser usado como valor para pos. 

O iterator first não precisa ser desreferenciável se first == last: apagar um range vazio é uma no-op. 

### Parâmetros

pos  |  \-  |  iterator para o elemento a ser removido   
---|---|---
first, last  |  \-  |  range de elementos a serem removidos   
Requisitos de tipo   
-`T` deve atender aos requisitos de [MoveAssignable](<#/doc/named_req/MoveAssignable>).   
  
### Valor de retorno

Iterator que segue o último elemento removido. 

1) Se pos se refere ao último elemento, então o iterator [end()](<#/doc/container/vector/end>) é retornado.

2) Se last == end() antes da remoção, então o iterator [end()](<#/doc/container/vector/end>) atualizado é retornado.

Se `[`first`, `last`)` é um range vazio, então last é retornado.

### Exceções

Não lança exceção a menos que uma exceção seja lançada pelo operador de atribuição de `T`. 

### Complexidade

Linear: o número de chamadas ao destrutor de `T` é o mesmo que o número de elementos apagados, o operador de atribuição de `T` é chamado um número de vezes igual ao número de elementos no vector após os elementos apagados. 

### Notas

Quando elementos do container precisam ser apagados com base em um predicado, em vez de iterar o container e chamar `erase` unário, a sobrecarga de range de iterator é geralmente usada com [`std::remove()/std::remove_if()`](<#/doc/algorithm/remove>) para minimizar o número de moves dos elementos restantes (não removidos) — este é o idioma erase-remove. [`std::erase_if()`](<#/doc/container/vector/erase2>) substitui o idioma erase-remove.(desde C++20)

### Exemplo

Execute este código
```
    #include <vector>
    #include <iostream>
     
     
    void print_container(const std::vector<int>& c)
    {
        for (int i : c)
            std::cout << i << ' ';
        std::cout << '\n';
    }
     
    int main()
    {
        std::vector<int> c{0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
        print_container(c);
     
        c.erase(c.begin());
        print_container(c);
     
        c.erase(c.begin() + 2, c.begin() + 5);
        print_container(c);
     
        // Erase all even numbers
        for (std::vector<int>::iterator it = c.begin(); it != c.end();)
        {
            if (*it % 2 == 0)
                it = c.erase(it);
            else
                ++it;
        }
        print_container(c);
    }
```

Saída: 
```
    0 1 2 3 4 5 6 7 8 9
    1 2 3 4 5 6 7 8 9
    1 2 6 7 8 9
    1 7 9
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 151](<https://cplusplus.github.io/LWG/issue151>) | C++98  | first era exigido como desreferenciável, o que tornava o comportamento de limpar um `vector` vazio indefinido  | não exigido se  
first == last  
[LWG 414](<https://cplusplus.github.io/LWG/issue414>) | C++98  | iterators no ponto de remoção não eram invalidados  | eles também são invalidados   
  
### Veja também

[ erase(std::vector)erase_if(std::vector)](<#/doc/container/vector/erase2>)(C++20) | apaga todos os elementos que satisfazem critérios específicos   
(modelo de função)  
[ clear](<#/doc/container/vector/clear>) | limpa o conteúdo   
(função membro pública)