# std::weak_ptr

Definido no header `[<memory>](<#/doc/header/memory>)`

```cpp
template< class T > class weak_ptr;  // (desde C++11)
```

`std::weak_ptr` é um smart pointer que mantém uma referência não-proprietária ("fraca") para um objeto que é gerenciado por [std::shared_ptr](<#/doc/memory/shared_ptr>). Ele deve ser convertido para [std::shared_ptr](<#/doc/memory/shared_ptr>) para acessar o objeto referenciado.

`std::weak_ptr` modela a propriedade temporária: quando um objeto precisa ser acessado apenas se ele existir, e ele pode ser deletado a qualquer momento por outra parte, `std::weak_ptr` é usado para rastrear o objeto, e ele é convertido para [std::shared_ptr](<#/doc/memory/shared_ptr>) para adquirir propriedade temporária. Se o [std::shared_ptr](<#/doc/memory/shared_ptr>) original for destruído neste momento, a vida útil do objeto é estendida até que o [std::shared_ptr](<#/doc/memory/shared_ptr>) temporário também seja destruído.

Outro uso para `std::weak_ptr` é quebrar ciclos de referência formados por objetos gerenciados por [std::shared_ptr](<#/doc/memory/shared_ptr>). Se tal ciclo for órfão (isto é, não há shared pointers externos apontando para o ciclo), as contagens de referência do `shared_ptr` não podem chegar a zero e a memória é vazada. Para evitar isso, um dos ponteiros no ciclo [pode ser tornado fraco](<#/doc/memory/weak_ptr/~weak_ptr>).

### Tipos Membro

Tipo Membro | Definição
---|---
`element_type` | | T | (até C++17)
[std::remove_extent_t](<#/doc/types/remove_extent>)&lt;T&gt; | (desde C++17)

### Funções Membro

[ (constructor)](<#/doc/memory/weak_ptr/weak_ptr>) | cria um novo `weak_ptr`
(função membro pública)
[ (destructor)](<#/doc/memory/weak_ptr/~weak_ptr>) | destrói um `weak_ptr`
(função membro pública)
[ operator=](<#/>) | atribui o `weak_ptr`
(função membro pública)

##### Modificadores

[ reset](<#/doc/memory/weak_ptr/reset>) | libera a propriedade do objeto gerenciado
(função membro pública)
[ swap](<#/doc/memory/weak_ptr/swap>) | troca os objetos gerenciados
(função membro pública)

##### Observadores

[ use_count](<#/doc/memory/weak_ptr/use_count>) | retorna o número de objetos `shared_ptr` que gerenciam o objeto
(função membro pública)
[ expired](<#/doc/memory/weak_ptr/expired>) | verifica se o objeto referenciado já foi deletado
(função membro pública)
[ lock](<#/doc/memory/weak_ptr/lock>) | cria um `shared_ptr` que gerencia o objeto referenciado
(função membro pública)
[ owner_before](<#/doc/memory/weak_ptr/owner_before>) | fornece ordenação de weak pointers baseada no proprietário
(função membro pública)
[ owner_hash](<#/doc/memory/weak_ptr/owner_hash>)(C++26) | fornece hashing de weak pointers baseado no proprietário
(função membro pública)
[ owner_equal](<#/doc/memory/weak_ptr/owner_equal>)(C++26) | fornece comparação de igualdade de weak pointers baseada no proprietário
(função membro pública)

### Funções Não-Membro

[ std::swap(std::weak_ptr)](<#/doc/memory/weak_ptr/swap2>)(C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)

### Classes Auxiliares

[ std::atomic<std::weak_ptr>](<#/doc/memory/weak_ptr/atomic2>)(C++20) | weak pointer atômico
(especialização de modelo de classe)

### [Guias de Dedução](<#/doc/memory/weak_ptr/deduction_guides>) (desde C++17)

### Notas

Assim como [std::shared_ptr](<#/doc/memory/shared_ptr>), uma implementação típica de `weak_ptr` armazena dois ponteiros:

*   um ponteiro para o bloco de controle; e
*   o ponteiro armazenado do `shared_ptr` do qual ele foi construído.

Um ponteiro armazenado separado é necessário para garantir que a conversão de um `shared_ptr` para `weak_ptr` e depois de volta funcione corretamente, mesmo para `shared_ptr`s com alias. Não é possível acessar o ponteiro armazenado em um `weak_ptr` sem bloqueá-lo em um `shared_ptr`.

[Macro de teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_smart_ptr_owner_equality`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | Habilita o uso de `std::weak_ptr` como chaves em [contêineres associativos não ordenados](<#/doc/container>)

### Exemplo

Demonstra como `lock` é usado para garantir a validade do ponteiro.

Execute este código
```cpp
    #include <iostream>
    #include <memory>
    
    std::weak_ptr<int> gw;
    
    void observe()
    {
        std::cout << "gw.use_count() == " << gw.use_count() << "; ";
        // precisamos fazer uma cópia do shared pointer antes do uso:
        if (std::shared_ptr<int> spt = gw.lock())
            std::cout << "*spt == " << *spt << '\n';
        else
            std::cout << "gw is expired\n";
    }
    
    int main()
    {
        {
            auto sp = std::make_shared<int>(42);
            gw = sp;
    
            observe();
        }
    
        observe();
    }
```

Saída:
```
    gw.use_count() == 1; *spt == 42
    gw.use_count() == 0; gw is expired
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 3001](<https://cplusplus.github.io/LWG/issue3001>) | C++17 | `element_type` não foi atualizado para suporte a arrays | atualizado

### Veja também

[ unique_ptr](<#/doc/memory/unique_ptr>)(C++11) | smart pointer com semântica de propriedade única de objeto
(modelo de classe)
[ shared_ptr](<#/doc/memory/shared_ptr>)(C++11) | smart pointer com semântica de propriedade compartilhada de objeto
(modelo de classe)