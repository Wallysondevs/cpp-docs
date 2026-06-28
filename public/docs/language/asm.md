# declaração asm

A _declaração asm_ permite incorporar código-fonte em linguagem assembly dentro de um programa C++. Esta declaração é condicionalmente suportada e (desde C++11)definida pela implementação, o que significa que pode não estar presente e, mesmo quando fornecida pela implementação, (desde C++11)não possui um significado fixo.

### Sintaxe

---
attr ﻿(opcional) `asm (` string-literal `)` `;` | | (até C++26)
---|---|---
attr ﻿(opcional) `asm (` balanced-token-seq `)` `;` | | (desde C++26)
- **attr** — (desde C++11) qualquer número de [atributos](<#/doc/language/attributes>)
- **string-literal** — o mesmo que em [literal de string](<#/doc/language/string_literal>), incluindo literais de string raw
- **balanced-token-seq** — uma sequência de tokens onde parênteses, colchetes e chaves estão balanceados; quaisquer restrições na balanced-token-seq e seu significado são definidas pela implementação

### Explicação

A balanced-token-seq é tipicamente um literal de string que representa um pequeno programa escrito em linguagem assembly, que é executado sempre que esta declaração é executada. Diferentes compiladores C++ possuem regras muito variadas para declarações asm, e diferentes convenções para a interação com o código C++ circundante.

Assim como outras [declarações de bloco](<#/doc/language/declarations>), esta declaração pode aparecer dentro de um bloco (um corpo de função ou outra instrução composta) e, como todas as outras declarações, esta declaração também pode aparecer fora de um bloco.

| Esta seção está incompleta
Razão: escrever uma nota sobre a sintaxe de assembly estendida do GCC, já que agora é suportada por Intel, IBM, Sun (a partir da v12), etc

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_constexpr`](<#/doc/feature_test>) | [`201907L`](<#/>) | (C++20) | [Inicialização padrão](<#/doc/language/default_initialization>) trivial e [declaração asm](<#/doc/language/asm>) em funções `constexpr`

### Palavras-chave

[`asm`](<#/doc/keyword/asm>)

### Exemplo

Demonstra dois tipos de sintaxe de assembly inline oferecidos pelos compiladores GCC/Clang. Este programa funciona corretamente apenas na plataforma x86_64 sob Linux.

Execute este código
```
    #include <iostream>
     
    extern "C" int func(int x);
    // a definição de func é escrita em linguagem assembly
    // literal de string raw pode ser muito útil
    asm(R"(
    .globl func
        .type func, @function
        func:
        .cfi_startproc
        movl %edi, %eax /* x está em RDI, veja a convenção de chamada x86-64 */
        addl $1, %eax
        ret
        .cfi_endproc
    )");
     
    int main()
    {
        int n = func(0110);
        // assembly inline anteriormente não padrão, tornado conforme por P2361R6
        asm ("leal (%0,%0,4),%0"
             : "=r" (n)
             : "0" (n));
        std::cout << "73*5 = " << n << std::endl; // o flush é intencional
     
        // assembly inline padrão
        asm ("movq $60, %rax\n" // o número da syscall de saída no Linux
             "movq $2,  %rdi\n" // este programa retorna 2
             "syscall");
    }
```

Saída:
```
    73*5 = 365
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 195](<https://cplusplus.github.io/CWG/issues/195.html>) | C++98 | era exigido o suporte a todas as declarações asm | tornado condicionalmente suportado
[CWG 2262](<https://cplusplus.github.io/CWG/issues/2262.html>) | C++11 | atributos não podiam ser aplicados a declarações asm | permitido

### Referências

  * Padrão C++26 (ISO/IEC 14882:2026): 

    

  * 9.10 A declaração `asm` [dcl.asm] 

  * Padrão C++23 (ISO/IEC 14882:2024): 

    

  * 9.10 A declaração `asm` [dcl.asm] 

  * Padrão C++20 (ISO/IEC 14882:2020): 

    

  * 9.10 A declaração `asm` [dcl.asm] 

  * Padrão C++17 (ISO/IEC 14882:2017): 

    

  * 10.4 A declaração `asm` [dcl.asm] 

  * Padrão C++14 (ISO/IEC 14882:2014): 

    

  * 7.4 A declaração `asm` [dcl.asm] 

  * Padrão C++11 (ISO/IEC 14882:2011): 

    

  * 7.4 A declaração `asm` [dcl.asm] 

  * Padrão C++03 (ISO/IEC 14882:2003): 

    

  * 7.4 A declaração `asm` [dcl.asm] 

  * Padrão C++98 (ISO/IEC 14882:1998): 

    

  * 7.4 A declaração `asm` [dcl.asm] 

### Veja também

  * [C++ ABIs](<#/doc/links>)

[Documentação C](<#/>) para Assembly inline
---
  
### Links externos

1.  | [GCC Inline Assembly HOWTO](<https://www.ibiblio.org/gferg/ldp/GCC-Inline-Assembly-HOWTO.html>)  
---|---
2.  | [GCC Inline ASM](<http://locklessinc.com/articles/gcc_asm/>) — Locklessinc.com   
3.  | [IBM XL C/C++ Inline Assembly](<https://www.ibm.com/docs/en/xl-c-and-cpp-aix/16.1?topic=compatibility-inline-assembly-statements>)  
4.  | [Intel C++ Inline Assembly](<https://www.intel.com/content/www/us/en/develop/documentation/cpp-compiler-developer-guide-and-reference/top/compiler-reference/intrinsics/data-align-mem-alloc-intrins-and-inline-asmbly/inline-assembly.html>)  
5.  | [Visual Studio Inline Assembler](<https://learn.microsoft.com/en-us/cpp/assembler/inline/inline-assembler>)  
6.  | [Sun Studio 12 Asm Statements](<https://web.archive.org/web/20160528215011/https://blogs.oracle.com/x86be/entry/gcc_style_asm_inlining_support>)  
7.  | [Inline assembly for Itanium-based HP-UX](<https://h21007.www2.hp.com/portal/site/dspp/menuitem.863c3e4cbcdc3f3515b49c108973a801?ciid=4308e2f5bde02110e2f5bde02110275d6e10RCRD>)  
8.  | [X86 calling conventions](<https://en.wikipedia.org/wiki/X86_calling_conventions> "enwiki:X86 calling conventions") — Wikipedia 