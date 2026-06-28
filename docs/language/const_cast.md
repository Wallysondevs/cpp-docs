# Conversão const_cast

Converte entre tipos com diferentes qualificações cv.

### Sintaxe

---
`const_cast <` target-type `>(` expression `)`
Retorna um valor do tipo target-type.

### Explicação

Apenas as seguintes conversões podem ser feitas com const_cast:

1) Para dois tipos de ponteiro para objeto ou ponteiro para membro de dados [semelhantes](<#/doc/language/implicit_cast>) `T1` e `T2`, um prvalue do tipo `T1` pode ser convertido para `T2` se `T1` e `T2` diferirem apenas na qualificação cv (formalmente, se, considerando as [decomposições de qualificação](<#/doc/language/implicit_cast>) de ambos os tipos, cada `P1_i` for o mesmo que `P2_i` para todo i).

  * Se expression for um valor de ponteiro nulo, o resultado também é um valor de ponteiro nulo.
  * Se expression for um valor de ponteiro para membro nulo, o resultado também é um valor de ponteiro para membro nulo.
  * Se expression apontar para um objeto, o resultado aponta para o mesmo objeto.
  * Se expression apontar para além de um objeto, o resultado aponta para além do mesmo objeto.
  * Se expression apontar para um membro de dados, o resultado aponta para o mesmo membro de dados.

Mesmo que expression seja um prvalue, [materialização temporária](<#/doc/language/implicit_cast>) não é realizada. | (desde C++17)

2) Para dois [tipos de objeto](<#/doc/language/type-id>) `T1` e `T2`, se um ponteiro para `T1` puder ser explicitamente convertido para o tipo “ponteiro para `T2`” usando const_cast<T2*>, então as seguintes conversões também podem ser feitas:

  * Um lvalue do tipo `T1` pode ser explicitamente convertido para um lvalue do tipo `T2` usando const_cast<T2&>.

  * Um glvalue do tipo `T1` pode ser explicitamente convertido para um xvalue do tipo `T2` usando const_cast<T2&&>.
  * Se `T1` for um tipo de classe ou array, um prvalue do tipo `T1` pode ser explicitamente convertido para um xvalue do tipo `T2` usando const_cast<T2&&>.

| (desde C++11)
---|---
A referência resultante se refere ao objeto original. | (até C++17)
Se expression for um glvalue, a referência resultante se refere ao objeto original. Caso contrário, a referência resultante se refere ao [temporário materializado](<#/doc/language/implicit_cast>). | (desde C++17)

Assim como em todas as expressões de cast, o resultado é:

  * um lvalue se target-type for um tipo de referência lvalue ou uma referência rvalue para tipo de função (desde C++11);

  * um xvalue se target-type for uma referência rvalue para tipo de objeto;

| (desde C++11)

  * um prvalue caso contrário.

### Removendo a constness

Para dois tipos diferentes `T1` e `T2`, uma conversão de `T1` para `T2` _remove a constness_ se existir uma [decomposição de qualificação](<#/doc/language/implicit_cast>) de `T2` da forma “cv2_0 P2_0 cv2_1 P2_1 ... cv2_n−1 P2_n−1 cv2_n U2”, e não houver [conversões de qualificação](<#/doc/language/implicit_cast>) que convertam `T1` para “cv2_0 P1_0 cv2_1 P1_1 ... cv2_n−1 P1_n−1 cv2_n U1” (mesmos componentes cv, diferentes componentes P e componentes U).

Se um cast de um prvalue do tipo `T1*` para o tipo `T2*` remover a constness, fazer um cast de uma expressão do tipo `T1` para uma referência a `T2` também removerá a constness.

Apenas const_cast pode ser usado para remover a constness.

“Remover a constness” implica “remover a volatility”, já que as conversões de qualificação também não podem remover a volatility.

### Notas

Ponteiros para funções e ponteiros para funções membro não estão sujeitos a const_cast.

const_cast torna possível formar uma referência ou ponteiro para um tipo não-const que na verdade se refere a um [objeto const](<#/doc/language/cv>) ou uma referência ou ponteiro para um tipo não-volatile que na verdade se refere a um [objeto volatile](<#/doc/language/cv>). Modificar um objeto const através de um caminho de acesso não-const e referenciar um objeto volatile através de um [glvalue](<#/doc/language/value_category>) não-volatile resulta em comportamento indefinido.

### Palavras-chave

[`const_cast`](<#/doc/keyword/const_cast>)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    
    struct type
    {
        int i;
    
        type(): i(3) {}
    
        void f(int v) const
        {
            // this->i = v;                 // compile error: this is a pointer to const
            const_cast<type*>(this)->i = v; // OK as long as the type object isn't const
        }
    };
    
    int main()
    {
        int i = 3;                 // i is not declared const
        const int& rci = i;
        const_cast<int&>(rci) = 4; // OK: modifies i
        std::cout << "i = " << i << '\n';
    
        type t; // if this was const type t, then t.f(4) would be undefined behavior
        t.f(4);
        std::cout << "type::i = " << t.i << '\n';
    
        const int j = 3; // j is declared const
        [[maybe_unused]]
        int* pj = const_cast<int*>(&j);
        // *pj = 4;      // undefined behavior
    
        [[maybe_unused]]
        void (type::* pmf)(int) const = &type::f; // pointer to member function
        // const_cast<void(type::*)(int)>(pmf);   // compile error: const_cast does
                                                  // not work on function pointers
    }
```

Saída:
```
    i = 4
    type::i = 4
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[CWG 1965](<https://cplusplus.github.io/CWG/issues/1965.html>) | C++11 | const_cast não podia vincular referências rvalue a prvalues de array | permitido vincular tais referências
[CWG 2879](<https://cplusplus.github.io/CWG/issues/2879.html>) | C++17 | operandos pvalue de ponteiro eram materializados | eles não são materializados

### Referências

  * C++23 standard (ISO/IEC 14882:2024):

    

  * 7.6.1.11 Const cast [expr.const.cast]

  * C++20 standard (ISO/IEC 14882:2020):

    

  * 7.6.1.10 Const cast [expr.const.cast]

  * C++17 standard (ISO/IEC 14882:2017):

    

  * 8.2.11 Const cast [expr.const.cast]

  * C++14 standard (ISO/IEC 14882:2014):

    

  * 5.2.11 Const cast [expr.const.cast]

  * C++11 standard (ISO/IEC 14882:2011):

    

  * 5.2.11 Const cast [expr.const.cast]

  * C++98 standard (ISO/IEC 14882:1998):

    

  * 5.2.11 Const cast [expr.const.cast]

  * C++03 standard (ISO/IEC 14882:2003):

    

  * 5.2.11 Const cast [expr.const.cast]

### Veja também

  * [`static_cast`](<#/doc/language/static_cast>)
  * [`dynamic_cast`](<#/doc/language/dynamic_cast>)
  * [`reinterpret_cast`](<#/doc/language/reinterpret_cast>)
  * [cast explícito](<#/doc/language/explicit_cast>)
  * [conversões implícitas](<#/doc/language/implicit_cast>)
