# std::weak_ptr&lt;T&gt;::use_count

```cpp
long use_count() const noexcept;  // (desde C++11)
```

  
Retorna o número de instâncias de `shared_ptr` que compartilham a propriedade do objeto gerenciado, ou ​0​ se o objeto gerenciado já foi excluído, ou seja, `*this` está vazio.

### Parâmetros

(nenhum)

### Valor de retorno

O número de instâncias de `shared_ptr` compartilhando a propriedade do objeto gerenciado no instante da chamada.

### Observações

O uso e o comportamento desta função são semelhantes a [std::shared_ptr::use_count](<#/doc/memory/shared_ptr/use_count>), mas ela retorna uma contagem diferente.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <memory>
    
    std::weak_ptr<int> gwp;
    
    void observe_gwp()
    {
        std::cout << "use_count(): " << gwp.use_count() << "\t id: ";
        if (auto sp = gwp.lock())
            std::cout << *sp << '\n';
        else
            std::cout << "??\n";
    }
    
    void share_recursively(std::shared_ptr<int> sp, int depth)
    {
        observe_gwp(); // : 2 3 4
        if (1 < depth)
            share_recursively(sp, depth - 1);
        observe_gwp(); // : 4 3 2
    }
    
    int main()
    {
        observe_gwp();
        {
            auto sp = std::make_shared<int>(42);
            gwp = sp;
            observe_gwp(); // : 1
            share_recursively(sp, 3); // : 2 3 4 4 3 2
            observe_gwp(); // : 1
        }
        observe_gwp(); // : 0
    }
```

Saída:
```
    use_count(): 0   id: ??
    use_count(): 1   id: 42
    use_count(): 2   id: 42
    use_count(): 3   id: 42
    use_count(): 4   id: 42
    use_count(): 4   id: 42
    use_count(): 3   id: 42
    use_count(): 2   id: 42
    use_count(): 1   id: 42
    use_count(): 0   id: ??
```

### Veja também

[ expired](<#/doc/memory/weak_ptr/expired>) | verifica se o objeto referenciado já foi excluído
(função membro pública)