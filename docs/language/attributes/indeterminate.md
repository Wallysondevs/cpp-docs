# Atributo C++: indeterminate (desde C++26)

Indica que a variável ou parâmetro de função possui um valor indeterminado se não for inicializado.

### Sintaxe

---
`[[indeterminate]]`
---

### Explicação

`[[**indeterminate**]]` pode ser aplicado à definição de uma variável de bloco com [duração de armazenamento](<#/doc/language/storage_duration>) automática ou a uma declaração de um parâmetro de uma [declaração de função](<#/doc/language/function>). O atributo especifica que os bytes que compõem o armazenamento de um objeto com duração de armazenamento automática são inicialmente [indeterminados](<#/doc/language/default_initialization>) em vez de errôneos.

Se um parâmetro de função for declarado com `[[**indeterminate**]]`, ele deve ser declarado na primeira declaração de sua função. Se um parâmetro de função for declarado com `[[**indeterminate**]]` na primeira declaração de sua função em uma unidade de tradução e a mesma função for declarada sem `[[**indeterminate**]]` no mesmo parâmetro em sua primeira declaração em outra unidade de tradução, o programa é [malformado, sem diagnóstico obrigatório](<#/doc/language/ub>).

### Notas

O atributo `[[indeterminate]]` restaura o comportamento indefinido que foi implicitamente introduzido até C++26. Ele pode fazer com que os compiladores considerem um caminho de código que lê um valor indeterminado como inatingível.

### Exemplo

Execute este código
```cpp
    void f(int);
    
    void g()
    {
        int x [[indeterminate]]; // valor indeterminado
        int y;                   // valor errôneo
    
        f(x); // comportamento indefinido
        f(y); // comportamento errôneo
    }
    
    struct T
    {
        T() {}
        int x;
    };
    
    void h(T a [[indeterminate]], T b)
    {
        f(a.x); // comportamento indefinido quando chamado abaixo
        f(b.x); // comportamento errôneo quando chamado abaixo
    }
    
    h(T(), T());
```

### Referências

  * Padrão C++26 (ISO/IEC 14882:2026): 

    

  * 9.12.7 Indeterminate storage [dcl.attr.indet] 
