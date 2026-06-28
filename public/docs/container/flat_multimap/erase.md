# std::flat_multimap&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::erase

```cpp
iterator erase( iterator position );  // (1) (desde C++23)
iterator erase( const_iterator pos );  // (2) (desde C++23)
iterator erase( const_iterator first, const_iterator last );  // (3) (desde C++23)
size_type erase( const Key& key );  // (4) (desde C++23)
template< class K >
size_type erase( K&& x );  // (5) (desde C++23)
```

Remove os elementos especificados do container. A ordem dos elementos equivalentes restantes é preservada.

1,2) Remove o elemento em pos.

3) Remove os elementos no range `[`first`, `last`)`, que deve ser um range válido em *this.

4) Remove todos os elementos com a chave equivalente a key.

5) Remove todos os elementos com chave que se compara _equivalente_ ao valor x. Esta sobrecarga participa da resolução de sobrecarga apenas se o qualified-id Compare::is_transparent for válido e denotar um tipo, e nem `iterator` nem `const_iterator` forem implicitamente conversíveis de `K`. Permite chamar esta função sem construir uma instância de `Key`.

| As informações sobre invalidação de iterator são copiadas de [aqui](<https://en.cppreference.com/w/Template:cpp/container/note_iterator_invalidation> "Template:cpp/container/note iterator invalidation")

O iterator pos deve ser válido e desreferenciável. Assim, o iterator end() (que é válido, mas não é desreferenciável) não pode ser usado como valor para pos.

### Parâmetros

- **pos** — iterator para o elemento a ser removido
- **first, last** — range de elementos a serem removidos
- **key** — valor da chave dos elementos a serem removidos
- **x** — um valor de qualquer tipo que pode ser comparado transparentemente com uma chave denotando os elementos a serem removidos

### Valor de retorno

1-3) Iterator que segue o último elemento removido.

4) Número de elementos removidos.

5) Número de elementos removidos.

### Exceções

1-3) Não lança exceções.

4,5) Quaisquer exceções lançadas pelo objeto `Compare`.

### Complexidade

Depende dos containers subjacentes. Tipicamente linear. | Esta seção está incompleta
Razão: revisão necessária

### Exemplo

Execute este código
```cpp
    #include <flat_map>
    #include <iostream>
    
    int main()
    {
        std::flat_multimap<int, std::string> c =
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

Saída:
```
    two four six
```

### Veja também

[ clear](<#/doc/container/flat_multimap/clear>) | limpa o conteúdo
(função membro pública)