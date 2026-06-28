# std::flat_multiset&lt;Key,Compare,KeyContainer&gt;::empty

```cpp
bool empty() const noexcept;  // (desde C++23)
```

Verifica se o container subjacente não possui elementos. Equivalente a: return begin() == end();.

### Parâmetros

(nenhum)

### Valor de retorno

true se o container subjacente estiver vazio, false caso contrário.

### Complexidade

Constante.

### Exemplo

O código a seguir usa `empty` para verificar se um [std::flat_multiset](<#/doc/container/flat_multiset>)&lt;int&gt; contém algum elemento:

Run this code
```
    #include <iostream>
    #include <flat_set>
    
    int main()
    {
        std::flat_multiset<int> numbers;
        std::cout << std::boolalpha;
        std::cout << "Initially, numbers.empty(): " << numbers.empty() << '\n';
    
        numbers.insert(42);
        numbers.insert(19937);
        std::cout << "After adding elements, numbers.empty(): " << numbers.empty() << '\n';
    }
```

Saída:
```
    Initially, numbers.empty(): true
    After adding elements, numbers.empty(): false
```

### Veja também

[ size](<#/doc/container/flat_multiset/size>) | retorna o número de elementos
(função membro pública)
[ empty](<#/doc/iterator/empty>)(C++17) | verifica se o container está vazio
(template de função)