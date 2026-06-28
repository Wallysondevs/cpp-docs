# std::unordered_multiset&lt;Key,Hash,KeyEqual,Allocator&gt;::erase

```cpp
  // (1)
iterator erase( iterator pos );  // (desde C++11)
(ate C++23)
iterator erase( iterator pos )
requires(!std::same_as<iterator, const_iterator>);  // (desde C++23)
iterator erase( const_iterator pos );  // (2) (desde C++11)
iterator erase( const_iterator first, const_iterator last );  // (3) (desde C++11)
size_type erase( const Key& key );  // (4) (desde C++11)
template< class K >
size_type erase( K&& x );  // (5) (desde C++23)
```

  
Remove elementos especificados do container. A ordem dos elementos restantes é preservada. (Isso torna possível apagar elementos individuais enquanto se itera pelo container.) 

1,2) Remove o elemento em `pos`. Apenas uma sobrecarga é fornecida se `iterator` e `const_iterator` forem do mesmo tipo.

3) Remove os elementos no range `[`first`, `last`)`, que deve ser um range válido em *this.

4) Remove todos os elementos com a chave equivalente a `key`.

5) Remove todos os elementos com chave que se compara _equivalente_ ao valor `x`. Esta sobrecarga participa da resolução de sobrecarga apenas se `Hash::is_transparent` e `KeyEqual::is_transparent` forem válidos e cada um denotar um tipo, e nem `iterator` nem `const_iterator` forem implicitamente conversíveis de `K`. Isso assume que tal `Hash` é chamável com ambos os tipos `K` e `Key`, e que o `KeyEqual` é transparente, o que, juntos, permite chamar esta função sem construir uma instância de `Key`.

Referências e iteradores para os elementos apagados são invalidados. Outros iteradores e referências não são invalidados. 

O iterador `pos` deve ser válido e desreferenciável. Assim, o iterador [end()](<#/doc/container/unordered_multiset/end>) (que é válido, mas não é desreferenciável) não pode ser usado como valor para `pos`. 

### Parâmetros

pos  |  \-  |  iterador para o elemento a ser removido   
---|---|---
first, last  |  \-  |  range de elementos a serem removidos   
key  |  \-  |  valor da chave dos elementos a serem removidos   
x  |  \-  |  um valor de qualquer tipo que pode ser comparado transparentemente com uma chave denotando os elementos a serem removidos   
  
### Valor de retorno

1-3) Iterador que segue o último elemento removido.

4) Número de elementos removidos.

5) Número de elementos removidos.

### Exceções

1-3) Não lança exceções.

4,5) Quaisquer exceções lançadas pelos objetos `Hash` e `KeyEqual`.

### Complexidade

Dada uma instância `c` de `unordered_multiset`: 

1,2) Caso médio: constante, pior caso: `c.size()`.

3) Caso médio: [std::distance](<#/doc/iterator/distance>)(first, last), pior caso: `c.size()`.

4) Caso médio: `c.count(key)`, pior caso: `c.size()`.

5) Caso médio: `c.count(x)`, pior caso: `c.size()`.

###  Notas

Macro de teste de recurso | Valor | Std | Recurso   
---|---|---|---
[`__cpp_lib_associative_heterogeneous_erasure`](<#/doc/feature_test>) | [`202110L`](<#/>) | (C++23) | Apagamento heterogêneo em [containers associativos](<#/doc/container>) e [containers associativos não ordenados](<#/doc/container>); sobrecarga ([5](<#/doc/container/unordered_multiset/erase>))  
  
### Exemplo

Execute este código
```cpp
    #include <unordered_set>
    #include <iostream>
    
    int main()
    {
        std::unordered_multiset<int> c = {1, 2, 3, 4, 1, 2, 3, 4};
    
        auto print = [&c]
        {
            std::cout << "c = { ";
            for (int n : c)
                std::cout << n << ' ';
            std::cout << "}\n";
        };
        print();
    
        std::cout << "Erase all odd numbers:\n";
        for (auto it = c.begin(); it != c.end();)
        {
            if (*it % 2 != 0)
                it = c.erase(it);
            else
                ++it;
        }
        print();
    
        std::cout << "Erase 1, erased count: " << c.erase(1) << '\n';
        std::cout << "Erase 2, erased count: " << c.erase(2) << '\n';
        std::cout << "Erase 2, erased count: " << c.erase(2) << '\n';
        print();
    }
```

Saída possível: 
```
    c = { 1 1 2 2 3 3 4 4 }
    Erase all odd numbers:
    c = { 2 2 4 4 }
    Erase 1, erased count: 0
    Erase 2, erased count: 2
    Erase 2, erased count: 0
    c = { 4 4 }
```

###  Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2059](<https://cplusplus.github.io/LWG/issue2059>) | C++11  | havia ambiguidade para a sobrecarga (2) | sobrecarga (1) adicionada  
[LWG 2356](<https://cplusplus.github.io/LWG/issue2356>) | C++11  | a ordem dos elementos não equivalentes que não são apagados não era garantida de ser preservada  | exigido que seja preservada   
  
### Veja também

[ clear](<#/doc/container/unordered_multiset/clear>) |  limpa o conteúdo   
(função membro pública)  