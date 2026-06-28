# std::flat_map&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::erase

```cpp
iterator erase( iterator position );  // (1) (desde C++23)
iterator erase( const_iterator pos );  // (2) (desde C++23)
iterator erase( const_iterator first, const_iterator last );  // (3) (desde C++23)
size_type erase( const Key& key );  // (4) (desde C++23)
template< class K >
size_type erase( K&& x );  // (5) (desde C++23)
```

  
Remove elementos especificados do container. 

1,2) Remove o elemento em `pos`. 

3) Remove os elementos no range `[`first`, `last`)`, que deve ser um range válido em *this.

4) Remove o elemento (se existir) com a chave equivalente a `key`.

5) Remove todos os elementos com chave que se compara _equivalente_ ao valor `x`. Esta sobrecarga participa da resolução de sobrecarga apenas se o qualified-id `Compare::is_transparent` for válido e denotar um tipo, e nem `iterator` nem `const_iterator` forem implicitamente conversíveis de `K`. Ela permite chamar esta função sem construir uma instância de `Key`.

| As informações sobre invalidação de iteradores são copiadas de [aqui](<https://en.cppreference.com/w/Template:cpp/container/note_iterator_invalidation> "Template:cpp/container/note iterator invalidation")  
  
O iterador `pos` deve ser válido e desreferenciável. Assim, o iterador `end()` (que é válido, mas não é desreferenciável) não pode ser usado como valor para `pos`. 

### Parâmetros

pos  |  \-  |  iterador para o elemento a ser removido   
---|---|---
first, last  |  \-  |  range de elementos a serem removidos   
key  |  \-  |  valor da chave dos elementos a serem removidos   
x  |  \-  |  um valor de qualquer tipo que pode ser comparado transparentemente com uma chave denotando os elementos a serem removidos   
  
### Valor de retorno

1-3) Iterador que segue o último elemento removido.

4) Número de elementos removidos (0 ou 1).

5) Número de elementos removidos.

### Exceções

1-3) Não lança exceções.

4,5) Quaisquer exceções lançadas pelo objeto `Compare`.

### Complexidade

Depende dos containers subjacentes. Tipicamente linear. | Esta seção está incompleta  
Razão: revisão necessária   
  
### Exemplo

Execute este código
```
    #include <flat_map>
    #include <iostream>
    
    int main()
    {
        std::flat_map<int, std::string> c =
        {
            {1, "one"}, {2, "two"}, {3, "three"},
            {4, "four"}, {5, "five"}, {6, "six"}
        };
    
        // erase all odd numbers from c
        for (auto it = c.begin(); it != c.end();)
        {
            if (it->first % 2 != 0)
                it = c.erase(it);
            else
                ++it;
        }
    
        for (auto& p : c)
            std::cout << p.second << ' ';
        std::cout << '\n';
    }
```

Output: 
```
    two four six
```

### Veja também

[ clear](<#/doc/container/flat_map/clear>) |  limpa o conteúdo   
(função membro pública)  